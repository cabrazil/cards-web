# Ambiente de Produção

## Visão Geral
Este documento descreve os processos e configurações necessárias para o deploy e manutenção do ambiente de produção do sistema de busca de cartões de crédito.

## Requisitos de Infraestrutura

### Servidor
- CPU: 2+ cores
- RAM: 4GB+
- Disco: 20GB+
- SO: Ubuntu 20.04 LTS ou superior

### Rede
- Firewall configurado
- SSL/TLS habilitado
- Balanceador de carga (opcional)
- CDN (recomendado)

## Configuração do Ambiente

### Variáveis de Ambiente
```env
VITE_API_URL=https://api.cartoes.com.br
VITE_ENV=production
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
VITE_SENTRY_DSN=https://xxxxxxxxxxxxxxxx@sentry.io/XXXXXX
```

### Nginx
Configuração em `/etc/nginx/sites-available/cartoes`:
```nginx
server {
    listen 80;
    server_name cartoes.com.br;
    
    location / {
        root /var/www/cartoes/dist;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### SSL/TLS
Configuração com Let's Encrypt:
```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d cartoes.com.br
```

## Processo de Deploy

### 1. Build
```bash
# Instalar dependências
npm ci

# Build de produção
npm run build

# Verificar build
npm run build:verify
```

### 2. Deploy
```bash
# Copiar arquivos
rsync -avz dist/ user@server:/var/www/cartoes/dist

# Reiniciar Nginx
ssh user@server "sudo systemctl restart nginx"
```

### 3. Verificação
```bash
# Verificar status
curl -I https://cartoes.com.br

# Verificar logs
ssh user@server "tail -f /var/log/nginx/error.log"
```

## Monitoramento

### Logs
- Nginx access/error logs
- Application logs
- Error tracking (Sentry)

### Métricas
- Uptime
- Response time
- Error rate
- Resource usage

### Alertas
- Slack/Email para erros críticos
- Monitoramento de performance
- Alertas de segurança

## Backup e Recuperação

### Backup
```bash
# Backup diário
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/cartoes

# Backup do banco de dados
pg_dump -U postgres cartoes > cartoes-$(date +%Y%m%d).sql
```

### Recuperação
```bash
# Restaurar arquivos
tar -xzf backup-YYYYMMDD.tar.gz -C /var/www/cartoes

# Restaurar banco
psql -U postgres cartoes < cartoes-YYYYMMDD.sql
```

## Segurança

### Firewall
```bash
# Regras básicas
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Headers de Segurança
```nginx
# Adicionar ao Nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
```

### CORS
```nginx
# Configuração CORS
add_header 'Access-Control-Allow-Origin' 'https://cartoes.com.br';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
```

## Performance

### Otimizações
- CDN para assets estáticos
- Cache de navegador
- Compressão Gzip
- Minificação de assets

### Monitoramento
- New Relic
- Google Analytics
- Custom metrics

## Manutenção

### Atualizações
```bash
# Atualizar sistema
sudo apt-get update
sudo apt-get upgrade

# Atualizar Node.js
sudo n stable

# Atualizar dependências
npm update
```

### Limpeza
```bash
# Limpar logs antigos
find /var/log/nginx -name "*.log" -mtime +30 -delete

# Limpar backups antigos
find /backup -name "*.tar.gz" -mtime +7 -delete
```

## Troubleshooting

### Problemas Comuns

1. **Erro 502 Bad Gateway**
```bash
# Verificar Nginx
sudo nginx -t

# Verificar logs
tail -f /var/log/nginx/error.log
```

2. **Alto Uso de CPU**
```bash
# Verificar processos
top

# Verificar Node.js
pm2 monit
```

3. **Erro de Memória**
```bash
# Verificar uso de memória
free -m

# Limpar cache
echo 3 > /proc/sys/vm/drop_caches
```

## Próximos Passos

### 1. Melhorias Planejadas
- Implementar CI/CD
- Adicionar monitoramento avançado
- Melhorar backup automatizado
- Implementar auto-scaling

### 2. Ferramentas
- Docker para containerização
- Kubernetes para orquestração
- Prometheus para métricas
- Grafana para visualização 