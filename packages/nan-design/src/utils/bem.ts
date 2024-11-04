// - 块（Block）：块是一个独立的实体，代表一个可重用的组件或模块。
// 块的类名应该使用单词或短语，并使用连字符（-）作为分隔符。例如：.header、.menu。
// - 元素（Element）：元素是块的组成部分，不能独立存在。
// 元素的类名应该使用双下划线（__）作为分隔符，连接到块的类名后面。例如：.menu__item、.header__logo。
// - 修饰符（Modifier）：修饰符用于描述块或元素的不同状态或变体，用来更改外观或行为。
// 修饰符的类名应该使用双连字符（--）作为分隔符，连接到块或元素的类名后面。例如：.menu__item--active、.header__logo--small。
import { isArray, isObject, isString } from './helper';
type BEMElement = string;
type BEMModifier = (string | undefined)[] | { [key: string]: boolean | string | undefined };

const IDENTITY = 'nan';

const createModifier = (prefix: string, modifierObject?: BEMModifier) => {
    let modifiers: string[] = [];
    if (isArray(modifierObject)) {
        modifiers = modifierObject
            .filter(Boolean)
            .map((modifier) => {
                return `${prefix}--${modifier}`;
            })
            .filter(Boolean);
    } else if (isObject(modifierObject)) {
        modifiers = Object.entries(modifierObject)
            .map(([modifier, value]) => {
                if (!value) return '';
                return `${prefix}--${modifier}`;
            })
            .filter(Boolean);
    }
    return modifiers;
};

type ClassItem = string[] | boolean | string | undefined;

/**
 *
 * @param classes 需要组合的类名
 * @returns 组合类名字符串
 */
const clsx = (...classes: ClassItem[]): string => {
    return classes
        .map((item) => (isArray(item) ? item.filter(Boolean).join(' ') : item))
        .filter(Boolean)
        .join(' ');
};

interface BEMCallable {
    (): string;
    (element: BEMElement): string;
    (element: BEMElement, modifier: BEMModifier): string;
    (element: BEMElement, modifier: BEMModifier, modifierLater: BEMModifier): string;
    (modifier: BEMModifier): string;
    (modifier: BEMModifier, modifierLater: BEMModifier): string;

    join: typeof clsx;
}

export const createCssSCope = (prefix: string) => {
    const prefixClass = `${IDENTITY}-${prefix}`;

    const bem: BEMCallable = (
        elementOrModifier?: BEMElement | BEMModifier,
        modifier?: BEMModifier
    ) => {
        if (!elementOrModifier) {
            return prefixClass;
        }
        if (isString(elementOrModifier)) {
            //  如果是字符串，代表是组件下一个元素，比如input-innner，inner就是elementOrModifier
            const element = `${prefixClass}__${elementOrModifier}`;
            if (!modifier) {
                return element;
            }
            return clsx(element, createModifier(element, modifier));
        }
        return clsx(
            prefixClass,
            createModifier(prefixClass, elementOrModifier),
            createModifier(prefixClass, modifier)
        );
    };
    bem.join = clsx;
    return bem;
};
