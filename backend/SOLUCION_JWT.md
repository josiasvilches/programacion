# 🔧 Solución Completa: Error JWT en API de Productos

## 🎯 Problema Identificado

El error: `"You must call @jwt_required() or verify_jwt_in_request() before using this method"` 

**Causa**: El endpoint `/productos` estaba intentando obtener la identidad JWT sin verificar primero si existe un token válido.

## ✅ Soluciones Implementadas

### **1. Autenticación Opcional en GET /productos**

```python
# Antes (ERROR):
current_identity = get_jwt_identity()  # ❌ Falla si no hay JWT

# Después (CORREGIDO):
current_identity = None
try:
    verify_jwt_in_request(optional=True)
    current_identity = get_jwt_identity()
except:
    current_identity = None
```

### **2. CORS Configurado**

```python
# Agregado en main/__init__.py:
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
```

### **3. Manejo de Usuarios Opcional**

```python
if current_identity:
    usuario = db.session.query(UsuarioModel).get(current_identity)
    if usuario and usuario.rol == 'ADMIN':
        productos_json = [producto.to_json_complete() for producto in productos.items]
    elif usuario and usuario.rol == 'USER':
        productos_json = [producto.to_json() for producto in productos.items]
    else:
        productos_json = [producto.to_json_short() for producto in productos.items]
else:
    # Sin autenticación = datos básicos
    productos_json = [producto.to_json_short() for producto in productos.items]
```

## 🚀 Pasos para Probar

### **1. Poblar Base de Datos**

```bash
cd backend
python test_productos.py
```

### **2. Iniciar Backend**

```bash
cd backend
python app.py
```

**Deberías ver**:
```
* Running on http://127.0.0.1:5000
* Debug mode: on
```

### **3. Probar API Directamente**

```bash
# Verificar que la API funciona:
curl http://localhost:5000/productos

# Debería retornar JSON sin errores:
{
  "productos": [...],
  "total": 4,
  "pages": 1,
  "page": 1
}
```

### **4. Iniciar Frontend**

```bash
cd frontend
ng serve
```

### **5. Probar Conexión**

1. Ve a `http://localhost:4200`
2. Click en "Comidas" en el header
3. Los productos deberían cargarse desde la API

## 🔍 Niveles de Acceso

### **Sin autenticación (Frontend público)**
```json
// to_json_short()
{
  "producto_id": 1,
  "nombre": "Pollo al Spiedo Entero",
  "precio": 3500.0,
  "imagen_url": null
}
```

### **Con JWT - Usuario normal**
```json
// to_json()
{
  "nombre": "Pollo al Spiedo Entero",
  "precio": 3500.0,
  "id_categoria": 1,
  "descripcion": "Pollo entero dorado...",
  "imagen_url": null
}
```

### **Con JWT - Admin**
```json
// to_json_complete()
{
  "producto_id": 1,
  "nombre": "Pollo al Spiedo Entero",
  "precio": 3500.0,
  "stock": 10,
  "id_categoria": 1,
  "descripcion": "Pollo entero dorado...",
  "imagen_url": null
}
```

## 🧪 Verificaciones de Estado

### **✅ Backend Funcionando**
- API responde en `http://localhost:5000/productos`
- Retorna JSON válido
- Headers CORS presentes

### **✅ Frontend Conectado**
- Productos se cargan en `/comidas`
- No hay errores CORS en console
- Fallback funciona si backend está offline

### **❌ Posibles Problemas**

1. **Puerto ocupado**: `Error: listen EADDRINUSE :::5000`
   - Solución: `lsof -i :5000` y `kill -9 <PID>`

2. **Error de módulos**: `ModuleNotFoundError: No module named 'flask_cors'`
   - Solución: `pip install flask-cors` (opcional, ya agregamos CORS manual)

3. **Base de datos vacía**: API retorna productos vacíos
   - Solución: Ejecutar `python test_productos.py`

## 🎯 Estado Actual

✅ **JWT opcional** - Funciona sin autenticación
✅ **CORS configurado** - Frontend puede conectar
✅ **Productos de ejemplo** - Script para poblar DB
✅ **Manejo de errores** - Fallback en frontend
✅ **Niveles de acceso** - Según rol de usuario

## 🚀 Próximos Pasos

1. **Ejecutar script de productos**: `python test_productos.py`
2. **Iniciar backend**: `python app.py` 
3. **Probar API**: `curl http://localhost:5000/productos`
4. **Iniciar frontend**: `ng serve`
5. **Navegar a comidas**: Click en header, no escribir URL

¡La conexión debería funcionar perfectamente ahora! 🎉