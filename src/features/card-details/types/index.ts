export interface CardProps {
  id:                    string;
  created_at:            string;
  updated_at:            string;
  card_name:             string;
  annual_fee:            number;
  card_brand:            string;
  category:              string;
  ranking_points:        number;
  ranking_benefits:      number;
  ranking_annuity:       number;
  ranking_miles_program: number;
  virtual_wallets:       string[];
  card_material:         string;
  contactless:           boolean;
  spread_on:             string;
  cashback:              string;
  international_card:    boolean;
  card_modality:         string;
  vip_lounge_app:        string;
  spread_rate:           number;
  iof_rate:              number;
  ranking_vip_lounges:   number;
  src_card_picture:      string;
  segment:               string;
  issuer_name:           string;
  points_expire:         boolean;
  obs_system_points:     string[];
  virtual_cards:         boolean;
  points_accelerator:    boolean;
  obs_summary:           string[];
  expense_code:          number;
  additional_info:       string[];
  is_debit:              boolean;
  zerofees: {
    id:             string;
    expenses:       string;
    investments:    string;
    fee_discount:   number;
    notes:          string;
    get_conditions: string[];
    fee_tips:       string[];
  }[];

  cashbacks: {
    id:           string;
    pct_cashback: number;
    txt_cashback: string;
    obs_cashback: string[];
    cash_tips:    string[];
  }[];

  rewards: {
    id:                 string;
    expenses:           string;
    points_per_dollar:  number;
    points_per_real:    number;
    rules:              string;
    points_limit:       number;
    expiration:         boolean;
    notes:              string;
  }[];

  mileages: {
    id:                string;
    program_name:      string;
    transfer_program:  string[];
    airlines:          string[];
    hotels:            string[];
    rate_points_miles: number;
    min_transfer:      number;
    exchange_store:    string[];
    pay_bills:         boolean;
    pay_cashback:      boolean;
    other_options:     string[];
  }[];

  lounges: {
    id:           string;
    lounge_name:  string;
    br_airport:   string[];
    int_airport:  string;
    access_limit: string;
    conditions:   string;
    ispaid:       boolean;
    vip_tips:     string[];
  }[];

  exclusives: {
    id:               string;
    tag_name:         string;
    tag_amount:       number;
    exclusive_offers: string[];
    additional_info:  string[];
  };

  requirements: {
    id:               string;
    account_holder:   boolean;
    add_cards_amount: number;
    obs_add_cards:    string;
    add_cards_charge: number;
    card_limit:       string;
    get_conditions:   string[];
    notes:            string[];
    req_tips:         string[];
  };

  brand: {
    id:           string;
    brand_name:   string;
    variant_name: string;
    general_benefits: string[];
    isActive:     boolean;
    site_info:    string;
  };
  
  issuer: {
    id:          string;
    issuer_name: string;
    issuer_type: string;
    created_at:  string;
  };
  brandId:               string;
  issuerId:              string;
} 