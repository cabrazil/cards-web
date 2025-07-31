# Sistema de Tema Centralizado

Este sistema centraliza todas as cores, tipografia e configurações visuais da aplicação para facilitar manutenção e garantir consistência.

## 📁 Estrutura

```
src/shared/theme/
├── theme.ts          # Definição do tema
└── README.md         # Esta documentação
```

## 🎨 Como Usar

### 1. Importar o tema

```typescript
import { theme, getThemeClasses } from '../../../shared/theme/theme';
```

### 2. Usar cores diretamente

```typescript
// Acessar cores específicas
const primaryColor = theme.colors.primary;           // '#1F3B4D'
const cardBackground = theme.colors.background.card; // '#163D57'
const textPrimary = theme.colors.text.primary;      // '#FFFFFF'
```

### 3. Usar classes Tailwind pré-definidas

```typescript
// Classes de texto
className={getThemeClasses.text.primary}    // 'text-white'
className={getThemeClasses.text.secondary}  // 'text-gray-300'

// Classes de fundo
className={getThemeClasses.background.main} // 'bg-[#011627]'
className={getThemeClasses.background.card} // 'bg-[#163D57]'

// Classes de botão
className={getThemeClasses.button.primary}  // 'border-2 border-[#FF9F1C] text-[#FF9F1C] hover:bg-[#FF9F1C] hover:text-white'
```

### 4. Usar função helper para cores

```typescript
import { getThemeColor } from '../../../shared/theme/theme';

const color = getThemeColor('colors.text.primary'); // '#FFFFFF'
const cardBg = getThemeColor('colors.background.card'); // '#163D57'
```

## 🎯 Paleta de Cores

### Cores Principais
- **Primary**: `#1F3B4D` (Azul-marinho profundo)
- **Secondary**: `#FF9F1C` (Laranja/Amarelo dos cards)
- **Highlight**: `#FF9F1C` (Laranja/Amarelo dos cards)

### Fundos
- **Main**: `#011627` (Fundo principal das páginas)
- **Card**: `#163D57` (Fundo dos cards)
- **Home**: `#011627` (Fundo da Home)

### Bordas
- **Card**: `#FF9F1C` (Borda dos cards)
- **Input**: `#FF9F1C` (Borda dos inputs)

### Textos
- **Primary**: `#FFFFFF` (Texto principal - branco)
- **Secondary**: `#E5E7EB` (Texto secundário - cinza claro)
- **Muted**: `#9CA3AF` (Texto suave - cinza médio)
- **Dark**: `#333333` (Texto escuro)

## 📝 Exemplos de Uso

### Componente com tema

```typescript
import { theme, getThemeClasses } from '../../../shared/theme/theme';

const MyComponent = () => {
  return (
    <div 
      className={`p-4 rounded-lg ${getThemeClasses.background.card} ${getThemeClasses.border.card}`}
      style={{ borderColor: theme.colors.border.card }}
    >
      <h2 className={getThemeClasses.text.primary}>
        Título
      </h2>
      <p className={getThemeClasses.text.secondary}>
        Descrição
      </p>
      <button className={getThemeClasses.button.primary}>
        Ação
      </button>
    </div>
  );
};
```

### Estilos inline com tema

```typescript
<div style={{ 
  backgroundColor: theme.colors.background.card,
  borderColor: theme.colors.border.card,
  color: theme.colors.text.primary
}}>
  Conteúdo
</div>
```

## 🔧 Manutenção

### Adicionar nova cor

1. Adicione a cor em `theme.colors`
2. Se necessário, adicione a classe correspondente em `getThemeClasses`
3. Atualize esta documentação

### Mudar cor existente

1. Altere o valor em `theme.colors`
2. Atualize as classes correspondentes em `getThemeClasses`
3. Teste em todos os componentes que usam essa cor

## ✅ Benefícios

- **Consistência**: Todas as cores centralizadas
- **Manutenibilidade**: Mudanças em um só lugar
- **TypeScript**: Tipagem completa do tema
- **Flexibilidade**: Classes Tailwind + valores diretos
- **Documentação**: Cores bem documentadas

## 🚀 Migração

Para migrar componentes existentes:

1. Importe o tema
2. Substitua cores hardcoded por referências ao tema
3. Use `getThemeClasses` para classes Tailwind comuns
4. Teste a aparência

Exemplo de migração:

```typescript
// Antes
<div className="bg-[#163D57] text-white border-[#FF9F1C]">

// Depois
<div className={`${getThemeClasses.background.card} ${getThemeClasses.text.primary} ${getThemeClasses.border.card}`}>
``` 