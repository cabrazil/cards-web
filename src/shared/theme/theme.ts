export const theme = {
  colors: {
    // Cores principais
    primary: '#1F3B4D',      // Azul-marinho profundo
    secondary: '#FF9F1C',    // Laranja/Amarelo dos cards
    highlight: '#FF9F1C',    // Laranja/Amarelo dos cards
    
    // Cores de fundo
    background: {
      main: '#011627',       // Fundo principal das páginas
      card: '#163D57',       // Fundo dos cards
      home: '#011627',       // Fundo da Home
    },
    
    // Cores de borda
    border: {
      card: '#FF9F1C',       // Borda dos cards
      input: '#FF9F1C',      // Borda dos inputs
    },
    
    // Cores de texto
    text: {
      primary: '#FFFFFF',    // Texto principal (branco)
      secondary: '#E5E7EB',  // Texto secundário (cinza claro)
      muted: '#9CA3AF',      // Texto suave (cinza médio)
      dark: '#333333',       // Texto escuro
    },
    
    // Cores de estado
    state: {
      hover: '#FF9F1C/20',   // Hover transparente
      focus: '#FF9F1C',      // Focus
      selected: '#FF9F1C',   // Selecionado
    },
    
    // Cores de feedback
    feedback: {
      success: '#10B981',    // Verde
      warning: '#F59E0B',    // Amarelo
      error: '#EF4444',      // Vermelho
      info: '#3B82F6',       // Azul
    }
  },
  
  // Configurações de fonte
  typography: {
    fontFamily: {
      primary: 'Roboto, sans-serif',
      secondary: 'sans-serif',
    },
    fontSize: {
      h1: '2.5rem',
      h2: '2rem', 
      h3: '1.75rem',
      h4: '1.5rem',
      h5: '1.25rem',
      h6: '1rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  
  // Configurações de espaçamento
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  // Configurações de borda
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  
  // Configurações de sombra
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  }
};

// Tipos TypeScript para o tema
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;

// Função helper para acessar cores do tema
export const getThemeColor = (path: string) => {
  const keys = path.split('.');
  let value: any = theme;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Theme color not found: ${path}`);
      return '#000000';
    }
  }
  
  return value;
};

// Função helper para obter classes Tailwind baseadas no tema
export const getThemeClasses = {
  // Classes de texto
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    dark: 'text-gray-900',
  },
  
  // Classes de fundo
  background: {
    main: 'bg-[#011627]',
    card: 'bg-[#163D57]',
    home: 'bg-[#011627]',
  },
  
  // Classes de borda
  border: {
    card: 'border-[#FF9F1C]',
    input: 'border-[#FF9F1C]',
  },
  
  // Classes de botão
  button: {
    primary: 'border-2 border-[#FF9F1C] text-[#FF9F1C] hover:bg-[#FF9F1C] hover:text-white',
    secondary: 'bg-[#FF9F1C] text-white hover:bg-[#FF9F1C]/90',
  }
}; 