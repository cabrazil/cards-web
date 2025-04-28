# Guia de Estilo e Design

## Visão Geral
Este documento define os padrões de estilo e design do sistema de busca de cartões de crédito, garantindo consistência visual e uma experiência de usuário coesa.

## Sistema de Design

### Cores
```scss
// Cores Primárias
$primary: #2D3748;
$primary-light: #4A5568;
$primary-dark: #1A202C;

// Cores Secundárias
$secondary: #4299E1;
$secondary-light: #63B3ED;
$secondary-dark: #3182CE;

// Cores de Feedback
$success: #48BB78;
$warning: #ECC94B;
$error: #F56565;
$info: #4299E1;

// Cores Neutras
$white: #FFFFFF;
$gray-100: #F7FAFC;
$gray-200: #EDF2F7;
$gray-300: #E2E8F0;
$gray-400: #CBD5E0;
$gray-500: #A0AEC0;
$gray-600: #718096;
$gray-700: #4A5568;
$gray-800: #2D3748;
$gray-900: #1A202C;
```

### Tipografia
```scss
// Fontes
$font-primary: 'Inter', sans-serif;
$font-secondary: 'Roboto', sans-serif;

// Tamanhos
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px

// Pesos
$font-light: 300;
$font-regular: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
```

### Espaçamento
```scss
// Espaçamento
$spacing-1: 0.25rem;  // 4px
$spacing-2: 0.5rem;   // 8px
$spacing-3: 0.75rem;  // 12px
$spacing-4: 1rem;     // 16px
$spacing-5: 1.25rem;  // 20px
$spacing-6: 1.5rem;   // 24px
$spacing-8: 2rem;     // 32px
$spacing-10: 2.5rem;  // 40px
$spacing-12: 3rem;    // 48px
```

### Breakpoints
```scss
// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

## Componentes

### Cards
```scss
.card {
  background: $white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: $spacing-4;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
```

### Botões
```scss
.button {
  padding: $spacing-2 $spacing-4;
  border-radius: 4px;
  font-weight: $font-medium;
  transition: all 0.2s;

  &-primary {
    background: $primary;
    color: $white;

    &:hover {
      background: $primary-dark;
    }
  }

  &-secondary {
    background: $secondary;
    color: $white;

    &:hover {
      background: $secondary-dark;
    }
  }
}
```

### Formulários
```scss
.input {
  padding: $spacing-2 $spacing-3;
  border: 1px solid $gray-300;
  border-radius: 4px;
  font-size: $text-base;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba($primary, 0.1);
  }
}
```

## Layout

### Grid System
```scss
.container {
  width: 100%;
  max-width: $breakpoint-xl;
  margin: 0 auto;
  padding: 0 $spacing-4;
}

.grid {
  display: grid;
  gap: $spacing-4;
  
  &-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  &-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  &-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Responsividade
```scss
@mixin responsive($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.card {
  width: 100%;
  
  @include responsive($breakpoint-md) {
    width: 50%;
  }
  
  @include responsive($breakpoint-lg) {
    width: 33.33%;
  }
}
```

## Animações

### Transições
```scss
@mixin transition($properties...) {
  transition: all 0.3s ease-in-out;
  transition-property: $properties;
}

.card {
  @include transition(transform, box-shadow);
}
```

### Keyframes
```scss
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

## Acessibilidade

### Cores
- Contraste mínimo de 4.5:1 para texto normal
- Contraste mínimo de 3:1 para texto grande
- Evitar uso exclusivo de cor para transmitir informação

### Foco
```scss
:focus {
  outline: 2px solid $primary;
  outline-offset: 2px;
}
```

### Estados
```scss
.button {
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}
```

## Próximos Passos

### 1. Melhorias Planejadas
- Implementar tema escuro
- Adicionar mais componentes reutilizáveis
- Melhorar sistema de grid
- Otimizar animações

### 2. Ferramentas
- Styled Components
- Tailwind CSS
- Framer Motion
- Storybook 