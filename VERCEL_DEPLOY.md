# 🚀 Guía de Despliegue en Vercel

## Pasos para desplegar tu aplicación Angular en Vercel

### 1. Preparación (✅ Ya completada)
- ✅ Configuración de `vercel.json` creada
- ✅ Script `vercel-build` agregado al `package.json`
- ✅ URL del backend de Railway configurada en `environment.prod.ts`

### 2. Desplegar en Vercel

#### Opción A: Desde la terminal (Recomendado)

1. **Instalar Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Iniciar sesión en Vercel**:
   ```bash
   vercel login
   ```

3. **Desplegar**:
   ```bash
   vercel
   ```
   - Sigue las instrucciones en pantalla
   - Confirma el directorio del proyecto
   - Acepta la configuración detectada

4. **Desplegar a producción**:
   ```bash
   vercel --prod
   ```

#### Opción B: Desde el dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New" → "Project"
3. Importa tu repositorio desde GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente que es un proyecto Angular
5. Verifica la configuración:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run vercel-build` (ya configurado)
   - **Output Directory**: `dist/frondend-angular2/browser` (ya configurado en vercel.json)
6. Haz clic en "Deploy"

### 3. Configuración del Backend

Tu aplicación ya está configurada para usar el backend de Railway:
- **URL del Backend**: `https://backendpython2-production.up.railway.app/api/empleados`
- Configurado en: `src/environments/environment.prod.ts`

### 4. Verificación CORS en Railway

Asegúrate de que tu backend en Railway permita peticiones desde tu dominio de Vercel.

En tu backend Django/Flask, necesitas agregar tu URL de Vercel a la configuración CORS:
```python
# Ejemplo para Django
CORS_ALLOWED_ORIGINS = [
    "https://tu-proyecto.vercel.app",
    "http://localhost:4200",  # Para desarrollo local
]

# O permitir todos (menos seguro):
CORS_ALLOW_ALL_ORIGINS = True
```

### 5. Variables de entorno (si las necesitas)

Si necesitas agregar variables de entorno en Vercel:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las variables necesarias

### 6. Dominios personalizados (Opcional)

Una vez desplegado, puedes agregar un dominio personalizado:
1. Ve a Settings → Domains en tu proyecto
2. Agrega tu dominio
3. Configura los registros DNS según las instrucciones

## 🔧 Comandos útiles

```bash
# Ver logs de despliegue
vercel logs

# Listar despliegues
vercel ls

# Ver información del proyecto
vercel inspect

# Eliminar un despliegue
vercel rm [deployment-url]
```

## ⚠️ Solución de problemas comunes

### Error de CORS
- Verifica que el backend permita peticiones desde tu dominio de Vercel
- Revisa los headers CORS en Railway

### Error 404 en rutas
- Vercel.json ya está configurado para manejar el routing de Angular
- Si persiste, verifica que `vercel.json` esté en la raíz del proyecto

### Error de build
- Asegúrate de que `ng build --configuration production` funcione localmente
- Verifica que todas las dependencias estén en `package.json`

## 📝 Notas adicionales

- Cada push al repositorio (si usas Git) generará un nuevo despliegue automático
- Las ramas se despliegan automáticamente en URLs de preview
- El branch principal se despliega a producción

## 🎉 ¡Listo!

Tu aplicación Angular está lista para desplegarse en Vercel. Sigue los pasos de la Opción A o B y tu frontend estará en línea en minutos.
