# Despliegue a Firebase

## Pasos para desplegar el Frontend Angular a Firebase Hosting

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login a Firebase
```bash
firebase login
```

### 3. Inicializar Firebase (si no lo has hecho)
```bash
firebase init
```
- Selecciona "Hosting"
- Crea un nuevo proyecto o selecciona uno existente
- Public directory: `dist/frondend-angular2/browser`
- Configure as single-page app: Yes
- Set up automatic builds: No

### 4. Construir el proyecto Angular para producción
```bash
ng build --configuration=production
```

### 5. Desplegar a Firebase
```bash
firebase deploy
```

## Configurar el Backend

Para el backend tienes varias opciones:

### Opción 1: Railway.app (Recomendado para Django/Python)
1. Ve a https://railway.app
2. Conecta tu repositorio de GitHub con el backend
3. Railway detectará automáticamente que es Python/Django
4. Agrega las variables de entorno necesarias
5. Despliega automáticamente

### Opción 2: Render.com
1. Ve a https://render.com
2. Crea un nuevo Web Service
3. Conecta tu repositorio
4. Configura las variables de entorno
5. Despliega

### Opción 3: Google Cloud Run
```bash
gcloud run deploy backend-empleados --source .
```

## Actualizar URL del Backend

Después de desplegar el backend, actualiza la URL en:
`src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-desplegado.railway.app/api/empleados'
};
```

## Base de Datos Supabase

Tu base de datos ya está en Supabase, solo asegúrate que:
1. El backend tenga las credenciales correctas de Supabase
2. Las reglas de CORS estén configuradas correctamente

## Variables de Entorno del Backend

Asegúrate de configurar en el servicio de hosting:
- `DATABASE_URL` o credenciales de Supabase
- `SECRET_KEY`
- `ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS` (incluye la URL de Firebase Hosting)
