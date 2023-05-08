import {
    FormControl,
    FormErrorMessage,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form/dist/types";

interface InputProps extends ChakraInputProps {
    name: string;
    err?: FieldError
}

export default function Input({ name, err, ...rest }: InputProps) {
    return (
        <FormControl isInvalid={!!err?.message}>
            <ChakraInput
                name={name}
                placeholder={name}
                focusBorderColor="green.500"
                border={0}
                bgColor='gray.900'
                {...rest}
            />

            {!!err?.message && <FormErrorMessage>{`${err.message}`}</FormErrorMessage>}
        </FormControl>
    )
}