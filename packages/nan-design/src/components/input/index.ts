import { Input as InputComponent } from './Input';
import Password from './Password';
import { InputProp } from './interface';

interface InputComponentType extends React.FC<InputProp> {
    Password: typeof Password;
}

const Input = InputComponent as InputComponentType;
Input.Password = Password;

export { Input };
