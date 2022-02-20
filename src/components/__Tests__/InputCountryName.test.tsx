import { cleanup, render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputCountryName from '../InputCountryName';
import axios from 'axios';

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    cleanup();
})

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: ()=>mockedUsedNavigate,
}))

describe("InputCountryName Component Test", () => {
    test("Heading Test", () => {
        render(<InputCountryName />);
        const heading = screen.getByTestId('heading');
        expect(heading.textContent).toBe('Search Country Details');
    })
    test("Input Test", () => {
        render(<InputCountryName />);
        const input = screen.getByTestId('input');
        expect(input).toBeTruthy();
    })
    test("Button Test", () => {
        render(<InputCountryName />);
        const button = screen.getByTestId('button');
        expect(button).toBeTruthy();
    })
})

describe("Api Test", () => {
    const mockUrl = 'https://restcountries.com/v3.1/name/india';
    const mockData = { data: {} };
    const getCountryData = jest.fn((url) => {
        return mockData
    })
    test("Api data Test", async() => {
        await act(async () => {
            const responce = await axios.get('https://restcountries.com/v3.1/name/india');
            expect(responce.data).toBeDefined();
        })
    })
    test("Api Status Test", async() => {
        await act(async () => {
            const responce = await axios.get('https://restcountries.com/v3.1/name/india');
            expect(responce.status).toBe(200);
        })
    })
    test("Return Api Data", () => {
        expect(getCountryData(mockUrl)).toBe(mockData);
    })
    test("Return Api Url", () => {
        expect(getCountryData).toBeCalledWith(mockUrl);
    })
    
})