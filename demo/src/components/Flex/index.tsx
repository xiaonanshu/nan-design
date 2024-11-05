import { Flex, Button } from '@nan-design/react';

const FlexBox = (props) => {
    return (
        <div>
            <Flex wrap="wrap" vertical={false} gap="middle">
                {new Array(10).fill('').map((item, index) => {
                    return (
                        <Button key={index} type="primary">
                            按钮
                        </Button>
                    );
                })}
            </Flex>
        </div>
    );
};
export default FlexBox;
