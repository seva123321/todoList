import { beforeEach, describe, test } from "vitest";
import { render } from "@testing-library/react";
import Input from "../../src/UI/Input/Input";

describe('Тестирование UI компонента Input', ()=>{
    describe('Тестирование базового функционала Input', ()=>{
        const inputTestId = 'abcdwewefwf2322'
        const inputValue = 'todo 1'
        beforeEach(()=>{
            render(<Input data-test={inputTestId} value={inputValue}/>)
        })

    test('',{})
})
})