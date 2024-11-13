import React, { useState, useEffect } from 'react';
//import { api } from '../services/api'
import axios from 'axios';

type Props = {
  brand:    string;
  variant:  string;
};

interface DataResponse {
  // Define the fields based on your backend response
  id:                 string;
  brand_name:         string;
  variant_name:       string;
  general_benefits:   string[];
  isActive:           boolean;
  created_at:         string;
  updated_at:         string;
  site_info:          string;
};

const BrandFetcher: React.FC<Props> = ({ brand, variant }) => {
  const [data, setData] = useState<DataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataResponse>(
          `/brandvar`, 
          { params: { brand, variant } }
        );
        setData(response.data || null); // If no record, set to null
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [brand, variant]);

  return (
    <div>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <p>
            <span className='text-gray-950 font-semibold ml-4'>Oi aqui</span>
            <span className="text-white text-xl ml-4 font-bold">Benefícios da Bandeira: </span>
            <span className="text-white text-xl ml-2 font-bold">{data.brand_name}</span>
          </p>
          <p>
            <span className='text-gray-950 font-semibold ml-4'>{data.variant_name}</span>
          </p>
          <p>
            <span className='text-gray-950 font-semibold ml-4'>{data.site_info}</span>
          </p>
        </div>
      ) : (
        <p>No data found for the provided parameters.</p>
      )}
    </div>
  );
};

export default BrandFetcher;
