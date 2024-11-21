import { screen, render } from "@testing-library/react";
import PricingCards from "./PricingCards";
import { MemoryRouter } from 'react-router-dom';

const plans = [
    {
      plan_name: 'Starter',
      plan_description: 'This is a basic plan',
      plan_price: 10,
    },
    {
      plan_name: 'Pro',
      plan_description: 'This is a premium plan',
      plan_price: 20,
    },
    {
        plan_name: 'Business+',
        plan_description: 'This is a premium plan',
        plan_price: 19,
      }
  ];

describe("Signup Page Test", () => {

    beforeEach(() => {
        render( <MemoryRouter> <PricingCards  avaliablePlans={plans} /> </MemoryRouter>);
      })
      
    test("if Pricing Cards have different plsns", () => {
        const basicPlan = screen.getByRole('heading', {name: /Starter/i})
        const proPlan = screen.getByRole('heading', {name: /Pro/i})
        const businessPlan = screen.getByRole('heading', {name: /Business+/i})
        expect(basicPlan).toBeInTheDocument();
        expect(proPlan).toBeInTheDocument();
        expect(businessPlan).toBeInTheDocument();
    })
});
