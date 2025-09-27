# 🚀 Deploy en Vercel - VulnSite

## ✅ Configuración Optimizada para Vercel

Este proyecto está **100% optimizado para Vercel** usando:
- ✅ **Base de datos en memoria** (sin SQLite)
- ✅ **Serverless functions** compatibles
- ✅ **Build optimizado** sin dependencias nativas

## 📋 Pasos para Deploy

### 1. 📤 Subir a GitHub

```bash
# Crear repositorio en GitHub
git add .
git commit -m "Proyecto VulnSite listo para Vercel"
git push origin main
```

### 2. 🌐 Deploy en Vercel

#### Opción A: Interfaz Web (Recomendado)

1. **Ve a [vercel.com](https://vercel.com)**
2. **Conecta tu GitHub**
3. **Selecciona el repositorio** `vuln-site-expose`
4. **Click "Deploy"** - ¡Automático!

#### Opción B: CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

### 3. ✅ URLs Resultantes

Después del deploy tendrás:

- **🏠 Home**: `https://tu-proyecto.vercel.app/`
- **🔴 SQL Login**: `https://tu-proyecto.vercel.app/sqli/login`
- **🔵 XSS Lab**: `https://tu-proyecto.vercel.app/xss/playground`
- **💬 Comments**: `https://tu-proyecto.vercel.app/xss/comments`
- **🔍 Search**: `https://tu-proyecto.vercel.app/sqli/search`

## 🗄️ Base de Datos en Memoria

### ✅ Funcionamiento

- **Datos iniciales** cargados automáticamente
- **Vulnerabilidades SQL** simuladas perfectamente
- **Comentarios XSS** persistentes durante la sesión
- **Sin configuración** adicional necesaria

### 👥 Usuarios Preconfigurados

| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | admin |
| `user1` | `password123` | user |
| `testuser` | `test123` | user |
| `alice` | `alice456` | user |

### 🚨 Payloads SQL que Funcionan

```sql
-- Login bypass
admin' OR 1=1 --
admin' --

-- Data extraction
' UNION SELECT id,username,password,email FROM users --

-- Boolean injection
' OR '1'='1' --
```

### ⚡ Payloads XSS que Funcionan

```html
<!-- Básicos -->
<script>alert('XSS')</script>
<img src="x" onerror="alert('XSS')">

<!-- Avanzados -->
<svg onload="alert('SVG XSS')">
<iframe src="javascript:alert('Frame XSS')">
```

## 🔧 Configuración Automática

### Variables de Entorno (Automáticas)

```env
# Estas se configuran automáticamente en Vercel
VERCEL=1
NODE_ENV=production
```

### vercel.json (Ya incluido)

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "buildCommand": "npm run build"
}
```

## 🧪 Testing Post-Deploy

### 1. Verificar Funcionamiento

```bash
# Health check
curl https://tu-proyecto.vercel.app/api/init

# Respuesta esperada:
{"success":true,"message":"Database initialized"}
```

### 2. Probar SQL Injection

```bash
# Login bypass
curl -X POST "https://tu-proyecto.vercel.app/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin'\''--","password":"cualquiera"}'
```

### 3. Probar XSS

```bash
# Agregar comentario con XSS
curl -X POST "https://tu-proyecto.vercel.app/api/comments" \
  -H "Content-Type: application/json" \
  -d '{"postId":1,"authorName":"Hacker","content":"<script>alert(\"XSS\")</script>"}'
```

## ⚠️ Limitaciones de Memoria

### 📝 Importante Saber

- **Datos se reinician** con cada cold start
- **Sesión temporal**: Los comentarios agregados se pierden
- **Perfecto para labs**: Ideal para testing y demos

### 💡 Para Persistencia Real

Si necesitas persistencia, considera:
- **Vercel KV** (Redis)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL)

## 🚨 Troubleshooting

### Error: Build Failed
```bash
# Solución: Reinstalar dependencias
npm ci
npm run build
```

### Error: Function Timeout
```bash
# Vercel Free: 10s timeout
# Vercel Pro: 60s timeout
# Las funciones del proyecto son rápidas (<1s)
```

### Error: 404 en APIs
```bash
# Verificar que las rutas existan:
ls app/api/
# Debe mostrar: auth, comments, init, products, search, users
```

## 📊 Monitoreo

### Logs en Tiempo Real

```bash
# Ver todos los logs
vercel logs

# Logs de función específica
vercel logs --function=/api/auth/login
```

### Métricas en Dashboard

- **Requests/min**
- **Response time**
- **Error rate**
- **Build time**

## 🎯 Siguiente Nivel

### Features Adicionales

1. **Custom Domain**: Agrega tu dominio
2. **Analytics**: Habilita Vercel Analytics
3. **Preview Deployments**: Testing automático
4. **Edge Functions**: Menor latencia global

### Seguridad Adicional

```javascript
// middleware.ts (opcional)
export function middleware(request: NextRequest) {
  // Restricciones por IP, headers, etc.
  const response = NextResponse.next();
  response.headers.set('X-Lab-Environment', 'true');
  return response;
}
```

---

## ✅ Deploy Exitoso!

Tu aplicación vulnerable está lista para:
- 🎓 **Educación en ciberseguridad**
- 🔍 **Testing de herramientas**
- 🛡️ **Demos de vulnerabilidades**
- 🏢 **Labs corporativos**

**🚨 Recuerda: Solo para fines educativos y de testing**