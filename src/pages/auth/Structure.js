{
  step1: {
    // product info
    product_name: "",
    product_tags: ["", "", ""], // or [{label:"",value:""}]
    product_desription: "",
  },

  step2: {
    // product data
    inventory: {
      sku: "",
      regular_price: "",
      sale_price: "",
      sale_price_date_from: "", //or date format
      sale_price_date_to: "", //or date format
      weight: "",
      unit: "",
      bulking_price_rules: [
        {
          quantity_from: "",
          quantity_to: "",
          price: "",
        },
      ],
    },

    variations: {
      enabled: true,
      manage_stock: true,
      sku: "",
      regular_price: 0.0,
      sale_price: 0.0,
      sale_price_dates_from: "",
      sale_price_dates_to: "",
      stock_quantity: 0,
      allow_backorders: "Do Not Allow",
      weight: 0.0,
      unit: "",
      description: "",
    },

    advanced: {
      purchase_note: "",
      min_order_quantity: "",
    },
  },

  step3: {
    // seo
    focused_keyword: ["", ""], //or [{label:"", value:""}]
    seo_title: "",
    slug: "",
    preview_as: "",
    meta_description: "",
  },

  step4: {
    featured_image: ["", ""],
    product_image: ["", ""],
  },

};

// a separate API for Publishing the project or keeping and as draft and also for receiving the project's current status