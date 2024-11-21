import React from 'react';
import { render, screen } from "./../../../test-utils";
import SubscriptionFeatureTable from './SubscriptionFeatureTable';

describe('SubscriptionFeatureTable', () => {
  const tableData = [
    ["Features", "Starter", "PRO", "Business"],
    ["Price", "Free", "$20", "$100"],
    ["In mail", true, true, true],
    ["Who Viewed Profile", true, true, true],
    ["Untimed People Searches", true, true, true],
    ["invoices", true, true, true],
    ["Reports", true, true, true],
  ];

  it('renders the table headers and data correctly', () => {
    render(<SubscriptionFeatureTable tableData={tableData} />);

    // Check if table headers are rendered correctly
    screen.getByText('Features');
    screen.getByText('Starter');
    screen.getByText('PRO');
    screen.getByText('Business');

    // Check if data rows are rendered correctly
    screen.getByText('Price');
    screen.getByText('Free');
    screen.getByText('$20');
    screen.getByText('$100');
    screen.getByText('In mail');
    screen.getByText('Who Viewed Profile');
    screen.getByText('Untimed People Searches');
    screen.getByText('invoices');
    screen.getByText('Reports');
  });

  it('renders the "Features" values in bold', () => {
    render(<SubscriptionFeatureTable tableData={tableData} />);

    // Check if "Features" values are rendered in bold
    const featuresHeaders = screen.getAllByText(/Features/);
    expect(featuresHeaders).toHaveLength(1); // There should be only one "Features" header
    expect(featuresHeaders[0]).toHaveStyle({ fontWeight: 'bold' });
  });

});
