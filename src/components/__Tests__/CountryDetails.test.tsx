import { cleanup, render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryDetails from '../CountryDetails';
import axios from 'axios';

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    cleanup();
})

const mockUseLocationValue = {
    pathname: "/country-details",
    search: "",
    hash: "",
    state: {
        capital: "40",
        Population: "50",
        latlng: "pqr",
        Flag: "abc"
      }
}
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as {},
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    }),
}))

describe("CountryDetails Component Test", () => {
    test("test", () => {
        expect(true).toBe(true);
    })
    test("Heading Test", () => {
        render(<CountryDetails />);
        const heading = screen.getByTestId('heading');
        expect(heading.textContent).toBe('Country Details');
    })
    test("location data Test", () => {
        render(<CountryDetails />);
        const capital = screen.getByTestId('capital');
        expect(capital.textContent).toBe("capital: "+mockUseLocationValue.state.capital);
    })
    test("location data Test", () => {
        render(<CountryDetails />);
        const population = screen.getByTestId('population');
        expect(population).toBe("Population: "+mockUseLocationValue.state.Population);
    })
    // test("location data Test", () => {
    //     render(<CountryDetails />);
    //     const latlng = screen.getByTestId('latlng');
    //     expect(latlng).toBe("latlng: "+mockUseLocationValue.state.latlng);
    // })
})

// describe("Api Test", () => {
//     const mockUrl = 'https://restcountries.com/v3.1/name/india';
//     const mockData = { data: {} };
//     const getCountryData = jest.fn((url) => {
//         return mockData
//     })
//     test("Api data Test", async() => {
//         await act(async () => {
//             const responce = await axios.get('https://restcountries.com/v3.1/name/india');
//             expect(responce.data).toBeDefined();
//         })
//     })
//     test("Api Status Test", async() => {
//         await act(async () => {
//             const responce = await axios.get('https://restcountries.com/v3.1/name/india');
//             expect(responce.status).toBe(200);
//         })
//     })
//     test("Return Api Data", () => {
//         expect(getCountryData(mockUrl)).toBe(mockData);
//     })
//     test("Return Api Url", () => {
//         expect(getCountryData).toBeCalledWith(mockUrl);
//     })
    
// })