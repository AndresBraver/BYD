# BYD Automundo Atizapán — con guardado real

## Antes de subir, en tu dashboard de Vercel

1. **Storage → Create Database → Blob.** Nómbralo como quieras (ej. `automundo-datos`)
   y dale **Connect** a este proyecto. Vercel agrega solo la variable que necesita
   (`BLOB_READ_WRITE_TOKEN`).

2. **Settings → Environment Variables → Add New.**
   - Name: `ADMIN_KEY`
   - Value: la clave que tú quieras para entrar al panel (ej. `MiClaveSegura2026`)
   - Guarda, y si el proyecto ya estaba desplegado, dale **Redeploy** una vez para
     que la variable quede activa.

## Subir el proyecto

Sube esta carpeta completa (`index.html`, `admin.html`, `package.json` y la carpeta
`api/`) a tu repo o arrástrala a vercel.com/new. Framework Preset: **Other**.
Vercel detecta la carpeta `api/` sola y las convierte en funciones — no necesitas
build command.

## Cómo se usa

- **Sitio público:** `tudominio.com`
- **Panel de edición:** `tudominio.com/admin.html`, con la clave `ADMIN_KEY` que
  pusiste arriba.
- Editas, le das **"Guardar y publicar"**, y el cambio ya lo ve cualquiera que
  visite el sitio — sin volver a subir nada.
- Exportar/Importar siguen ahí como respaldo manual, por si quieres una copia
  del contenido fuera del sitio.

## Qué cambió respecto a la versión anterior

- El contenido (modelos, promos, agencias, fotos...) ya no vive en el propio
  `index.html`, sino en un archivo `contenido.json` guardado en Vercel Blob.
  `index.html` lo consulta en cada visita vía `/api/contenido`.
- Las citas ya no se bloquean por navegador: se guardan en `/api/reservas`,
  compartido entre todos los visitantes. Si alguien aparta un horario, de verdad
  desaparece para los demás.
- El candado del admin ya no compara la clave dentro del código: se verifica
  contra el servidor (`/api/verificar`), y esa misma clave autoriza el guardado
  (`/api/guardar`). Nadie puede publicar sin la clave correcta, ni viéndola en
  el código fuente.

## Límites que siguen ahí

- El bloqueo de horarios usa "leer, revisar, escribir" sobre un archivo — no es
  una base de datos transaccional. Es muchísimo mejor que antes (que garantizaba
  choques entre navegadores), pero en el caso extremadamente raro de que dos
  personas den clic en el mismo segundo exacto, podría colarse un choque. Para
  cero riesgo se necesitaría una base de datos real (Postgres/Supabase) con
  restricción única — puedo montarlo si el volumen de citas lo justifica.
- Las fotos se guardan como texto dentro del JSON (base64). Bien para fotos
  chicas/medianas; si subes muchas en alta resolución, el archivo crece y todo
  se pone más lento. El límite duro es 4 MB de contenido total.
