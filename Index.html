import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, Search, Zap, Gauge, BatteryCharging,
  Phone, MessageCircle, Check, MapPin, Clock, Wrench, X, Menu,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   BYD Tlalnepantla — reconstrucción
   Datos: catálogo BYD México, sucursal Tlalnepantla, Edo. Méx.
   Los vehículos viven en un solo arreglo; cámbialo por tu
   endpoint /api/vehiculos cuando conectes la base de datos.
   ═══════════════════════════════════════════════════════════ */

const CATALOGO = [
  { id: 1, modelo: "Dolphin Mini", version: "GS", anio: 2026, precio: 358800, carroceria: "Hatchback", tipo: "BEV",
    autonomia: 380, bateria: 38, potencia: 95, ceroCien: 10.9, carga: "30 min (30–80%)", color: "#7ED8C3",
    claim: "El eléctrico más accesible del país." },
  { id: 2, modelo: "Dolphin", version: "GL", anio: 2026, precio: 469900, carroceria: "Hatchback", tipo: "BEV",
    autonomia: 427, bateria: 44.9, potencia: 174, ceroCien: 7.0, carga: "29 min (30–80%)", color: "#93AEE0",
    claim: "Cabina de sedán en tamaño de ciudad." },
  { id: 3, modelo: "Yuan Plus", version: "GS", anio: 2026, precio: 599900, carroceria: "SUV", tipo: "BEV",
    autonomia: 510, bateria: 60.5, potencia: 204, ceroCien: 7.3, carga: "28 min (30–80%)", color: "#C6CBD2",
    claim: "La SUV eléctrica que más se vende en México." },
  { id: 4, modelo: "Seal", version: "GS", anio: 2026, precio: 749900, carroceria: "Sedán", tipo: "BEV",
    autonomia: 570, bateria: 82.5, potencia: 313, ceroCien: 5.9, carga: "26 min (30–80%)", color: "#27374F",
    claim: "Tracción trasera y 570 km reales." },
  { id: 5, modelo: "Song Pro", version: "DM-i", anio: 2026, precio: 679900, carroceria: "SUV", tipo: "PHEV",
    autonomia: 1100, bateria: 18.3, potencia: 235, ceroCien: 7.9, carga: "Enchufe casero 220V", color: "#B3C0A8",
    claim: "1,100 km sin buscar cargador." },
  { id: 6, modelo: "Shark", version: "GL", anio: 2026, precio: 919900, carroceria: "Pickup", tipo: "PHEV",
    autonomia: 840, bateria: 29.6, potencia: 430, ceroCien: 5.7, carga: "Enchufe casero 220V", color: "#454F5B",
    claim: "430 hp y toma de corriente en la caja." },
];

const SUCURSAL = {
  nombre: "BYD Tlalnepantla",
  direccion: "Av. Sor Juana Inés de la Cruz, Tlalnepantla de Baz, Edo. Méx.",
  tel: "+525500000000",
  telVisible: "55 0000 0000",
  horario: "Lun a Sáb 9:00–19:00 · Dom 11:00–16:00",
};

const TASA = 13.9;
const PLAZOS = [24, 36, 48, 60, 72];
const CARROCERIAS = ["Todos", "Hatchback", "Sedán", "SUV", "Pickup"];

const mxn = (n) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

/* Amortización francesa — mensualidad real, no un formulario disfrazado */
function mensualidad(precio, enganche, tasaAnual, meses) {
  const P = precio - enganche;
  if (P <= 0) return 0;
  const i = tasaAnual / 12 / 100;
  return i === 0 ? P / meses : (P * i) / (1 - Math.pow(1 + i, -meses));
}

const wa = (msg) => `https://wa.me/${SUCURSAL.tel.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

/* ── Silueta vectorial: cero peso de imagen, cero foto de stock ── */
function Silueta({ color, carroceria, className = "" }) {
  const perfil = {
    Hatchback: "M14 60 L24 42 Q30 32 46 31 L86 31 Q100 32 108 45 L134 51 Q146 54 146 63 L146 69 L14 69 Z",
    Sedán:     "M10 60 L22 43 Q28 32 46 31 L94 31 Q110 32 120 45 L144 52 Q154 55 154 64 L154 69 L10 69 Z",
    SUV:       "M12 58 L22 38 Q28 28 46 27 L98 27 Q114 28 124 41 L146 48 Q156 51 156 61 L156 69 L12 69 Z",
    Pickup:    "M10 58 L20 38 Q26 28 44 27 L80 27 Q92 28 98 41 L98 49 L152 49 Q160 51 160 61 L160 69 L10 69 Z",
  }[carroceria];

  return (
    <svg viewBox="0 0 172 80" className={className} role="img" aria-label={`Perfil ${carroceria}`}>
      <path d={perfil} fill={color} />
      <circle cx="46" cy="69" r="11" fill="#111820" />
      <circle cx="46" cy="69" r="4.5" fill={color} />
      <circle cx="126" cy="69" r="11" fill="#111820" />
      <circle cx="126" cy="69" r="4.5" fill={color} />
    </svg>
  );
}

/* ═══════════ Calculadora — la pieza que ningún dealer MX tiene ═══════════ */
function Calculadora({ auto, compacta = false }) {
  const [pct, setPct] = useState(30);
  const [meses, setMeses] = useState(48);

  const enganche = Math.round((auto.precio * pct) / 100);
  const pago = mensualidad(auto.precio, enganche, TASA, meses);

  return (
    <section className="bg-[#111820] text-white rounded-3xl p-6 sm:p-7">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-white/45">Tu mensualidad</h2>
        <span className="text-[11px] text-white/40 tabular-nums">{TASA}% anual</span>
      </div>

      <div className="flex items-baseline gap-2 mb-7">
        <span className="text-5xl sm:text-6xl font-semibold tracking-[-0.03em] tabular-nums">{mxn(pago)}</span>
        <span className="text-white/45 text-sm">/ mes</span>
      </div>

      <label className="block mb-6">
        <span className="flex justify-between text-sm mb-2.5">
          <span className="text-white/65">Enganche</span>
          <span className="tabular-nums font-medium">{mxn(enganche)} <span className="text-white/35">· {pct}%</span></span>
        </span>
        <input
          type="range" min={10} max={60} step={5} value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Porcentaje de enganche"
          className="w-full h-1.5 rounded-full appearance-none bg-white/15 accent-[#3DE0AE] focus:outline-none focus:ring-2 focus:ring-[#3DE0AE] focus:ring-offset-2 focus:ring-offset-[#111820]"
        />
      </label>

      <div className="mb-6">
        <div className="text-sm text-white/65 mb-2.5">Plazo en meses</div>
        <div className="grid grid-cols-5 gap-1.5">
          {PLAZOS.map((p) => (
            <button key={p} onClick={() => setMeses(p)} aria-pressed={meses === p}
              className={`min-h-[46px] rounded-xl text-sm tabular-nums transition-colors ${
                meses === p ? "bg-[#3DE0AE] text-[#111820] font-semibold" : "bg-white/10 text-white/65 hover:bg-white/20"
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {!compacta && (
        <div className="border-t border-white/10 pt-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-white/55">
            <span>Monto a financiar</span><span className="tabular-nums">{mxn(auto.precio - enganche)}</span>
          </div>
          <div className="flex justify-between text-white/55">
            <span>Costo total del crédito</span><span className="tabular-nums">{mxn(pago * meses + enganche)}</span>
          </div>
        </div>
      )}

      <a href={wa(`Hola, me interesa el ${auto.modelo} ${auto.version}. Vi una mensualidad de ${mxn(pago)} a ${meses} meses.`)}
        className="mt-6 flex items-center justify-center gap-2 min-h-[50px] rounded-xl bg-white text-[#111820] font-medium">
        <MessageCircle size={17} /> Mandar esta cotización
      </a>

      <p className="text-[11px] text-white/30 mt-4 leading-relaxed">
        Cálculo informativo. La tasa final la define la institución financiera según tu perfil crediticio.
      </p>
    </section>
  );
}

/* ═══════════ Ficha del vehículo ═══════════ */
function Ficha({ auto, onVolver }) {
  useEffect(() => { window.scrollTo(0, 0); }, [auto.id]);

  const specs = [
    { icon: BatteryCharging, label: auto.tipo === "BEV" ? "Autonomía" : "Autonomía combinada", valor: `${auto.autonomia} km` },
    { icon: Zap, label: "Potencia", valor: `${auto.potencia} hp` },
    { icon: Gauge, label: "0 a 100 km/h", valor: `${auto.ceroCien} s` },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F3]">
      <div className="sticky top-0 z-20 bg-[#F6F6F3]/92 backdrop-blur-md border-b border-black/5">
        <button onClick={onVolver} className="flex items-center gap-1.5 px-4 min-h-[52px] text-sm text-[#111820]">
          <ChevronLeft size={18} /> Todos los modelos
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-28">
        <div className="rounded-3xl bg-white border border-black/5 px-6 py-10 mt-4 mb-7">
          <Silueta color={auto.color} carroceria={auto.carroceria} className="w-full max-w-md mx-auto" />
        </div>

        <div className="mb-7">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#111820]/40 mb-2">
            {auto.tipo === "BEV" ? "100% eléctrico" : "Híbrido enchufable"} · {auto.anio}
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.035em] text-[#111820] leading-[0.92]">
            {auto.modelo}
          </h1>
          <div className="text-lg text-[#111820]/45 mt-1.5">{auto.version}</div>
          <p className="text-[#111820]/65 mt-4 leading-relaxed">{auto.claim}</p>
          <div className="text-2xl font-medium tabular-nums text-[#111820] mt-5">{mxn(auto.precio)}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {specs.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-black/5 p-4">
              <s.icon size={16} className="text-[#111820]/30 mb-3" />
              <div className="text-lg font-medium tabular-nums text-[#111820] leading-tight">{s.valor}</div>
              <div className="text-[11px] text-[#111820]/45 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-4 mb-7 flex items-center gap-3">
          <BatteryCharging size={16} className="text-[#111820]/30 shrink-0" />
          <span className="text-sm text-[#111820]/65">Carga rápida: <span className="text-[#111820]">{auto.carga}</span></span>
        </div>

        <div className="mb-7"><Calculadora auto={auto} /></div>

        <div className="bg-white rounded-3xl border border-black/5 p-6">
          <h2 className="text-sm font-medium text-[#111820] mb-4">Cada unidad incluye</h2>
          <ul className="space-y-2.5">
            {["Garantía de 6 años o 150,000 km",
              "Batería Blade con garantía de 8 años",
              "Cargador de pared con instalación",
              "Primeros 3 servicios sin costo"].map((t) => (
              <li key={t} className="flex gap-2.5 text-sm text-[#111820]/70">
                <Check size={16} className="text-[#111820]/25 shrink-0 mt-0.5" />{t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-black/8 px-4 pt-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <div className="max-w-3xl mx-auto flex gap-2">
          <a href={`tel:${SUCURSAL.tel}`} aria-label="Llamar a la sucursal"
            className="flex items-center justify-center px-5 rounded-2xl border border-black/10 text-[#111820] min-h-[50px]">
            <Phone size={18} />
          </a>
          <a href={wa(`Hola, quiero agendar una prueba de manejo del ${auto.modelo}.`)}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#111820] text-white font-medium min-h-[50px]">
            Agendar prueba de manejo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ Inventario filtrable ═══════════ */
function Inventario({ onAbrir }) {
  const [carroceria, setCarroceria] = useState("Todos");
  const [precioMax, setPrecioMax] = useState(1000000);
  const [q, setQ] = useState("");

  const resultados = useMemo(() => CATALOGO.filter((v) =>
    (carroceria === "Todos" || v.carroceria === carroceria) &&
    v.precio <= precioMax &&
    `${v.modelo} ${v.version}`.toLowerCase().includes(q.trim().toLowerCase())
  ), [carroceria, precioMax, q]);

  const limpiar = () => { setCarroceria("Todos"); setPrecioMax(1000000); setQ(""); };

  return (
    <section id="modelos" className="max-w-5xl mx-auto px-4 py-14 scroll-mt-16">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#111820] mb-6">
        Modelos disponibles
      </h2>

      <div className="relative mb-4">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#111820]/30" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar modelo"
          className="w-full pl-11 pr-4 rounded-2xl border border-black/10 bg-white text-base text-[#111820] min-h-[50px] focus:outline-none focus:ring-2 focus:ring-[#111820]/20" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5 -mx-4 px-4">
        {CARROCERIAS.map((c) => (
          <button key={c} onClick={() => setCarroceria(c)} aria-pressed={carroceria === c}
            className={`px-4 rounded-full text-sm whitespace-nowrap min-h-[42px] transition-colors ${
              carroceria === c ? "bg-[#111820] text-white" : "bg-white border border-black/10 text-[#111820]/70"
            }`}>{c}</button>
        ))}
      </div>

      <label className="block mb-7">
        <span className="flex justify-between text-sm mb-2.5 text-[#111820]/60">
          <span>Precio hasta</span>
          <span className="tabular-nums font-medium text-[#111820]">{mxn(precioMax)}</span>
        </span>
        <input type="range" min={300000} max={1000000} step={20000} value={precioMax}
          onChange={(e) => setPrecioMax(Number(e.target.value))} aria-label="Precio máximo"
          className="w-full h-1.5 rounded-full appearance-none bg-black/10 accent-[#111820]" />
      </label>

      <div className="text-sm text-[#111820]/45 mb-4 tabular-nums">
        {resultados.length} {resultados.length === 1 ? "modelo" : "modelos"}
      </div>

      {resultados.length === 0 ? (
        <div className="bg-white rounded-3xl border border-black/5 p-12 text-center">
          <p className="text-[#111820]/60 text-sm mb-4">Ningún modelo entra en ese rango.</p>
          <button onClick={limpiar} className="text-sm font-medium text-[#111820] underline underline-offset-4">
            Quitar filtros
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {resultados.map((v) => (
            <button key={v.id} onClick={() => onAbrir(v)}
              className="text-left bg-white rounded-3xl border border-black/5 p-6 hover:border-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#111820]/25">
              <Silueta color={v.color} carroceria={v.carroceria} className="w-full max-w-[230px] mb-5" />
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#111820]/40 mb-1.5">
                {v.tipo === "BEV" ? "Eléctrico" : "Híbrido"} · {v.autonomia} km
              </div>
              <div className="text-xl font-semibold tracking-[-0.02em] text-[#111820] leading-tight">
                {v.modelo} <span className="font-normal text-[#111820]/40">{v.version}</span>
              </div>
              <div className="flex items-baseline justify-between mt-4">
                <span className="tabular-nums text-[#111820] font-medium">{mxn(v.precio)}</span>
                <span className="text-xs text-[#111820]/45 tabular-nums flex items-center gap-0.5">
                  desde {mxn(mensualidad(v.precio, v.precio * 0.3, TASA, 72))}/mes <ChevronRight size={13} />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══════════ Servicio y sucursal ═══════════ */
function Sucursal() {
  return (
    <section id="sucursal" className="max-w-5xl mx-auto px-4 pb-16 scroll-mt-16">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-3xl border border-black/5 p-6">
          <MapPin size={17} className="text-[#111820]/30 mb-4" />
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#111820] mb-2">{SUCURSAL.nombre}</h2>
          <p className="text-sm text-[#111820]/60 leading-relaxed mb-4">{SUCURSAL.direccion}</p>
          <div className="flex items-start gap-2 text-sm text-[#111820]/60">
            <Clock size={15} className="shrink-0 mt-0.5 text-[#111820]/30" />{SUCURSAL.horario}
          </div>
          <a href={`tel:${SUCURSAL.tel}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#111820] underline underline-offset-4">
            <Phone size={15} /> {SUCURSAL.telVisible}
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-black/5 p-6 flex flex-col">
          <Wrench size={17} className="text-[#111820]/30 mb-4" />
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#111820] mb-2">Taller de servicio</h2>
          <p className="text-sm text-[#111820]/60 leading-relaxed mb-5">
            Técnicos certificados por BYD y refacciones originales. Agenda tu cita y te confirmamos el mismo día.
          </p>
          <a href={wa("Hola, quiero agendar una cita de servicio.")}
            className="mt-auto flex items-center justify-center gap-2 min-h-[50px] rounded-2xl bg-[#111820] text-white font-medium">
            <MessageCircle size={17} /> Agendar cita de servicio
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════ App ═══════════ */
export default function App() {
  const [auto, setAuto] = useState(null);
  const [menu, setMenu] = useState(false);
  const destacado = CATALOGO[2];

  if (auto) return <Ficha auto={auto} onVolver={() => setAuto(null)} />;

  const ir = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F3]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>

      {/* Nav corta, estilo Tesla: 3 destinos, no 12 */}
      <nav className="sticky top-0 z-30 bg-[#F6F6F3]/92 backdrop-blur-md border-b border-black/5">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between min-h-[56px]">
          <span className="text-sm font-semibold tracking-[0.14em] text-[#111820]">BYD TLALNEPANTLA</span>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[#111820]/65">
            <button onClick={() => ir("modelos")}>Modelos</button>
            <button onClick={() => ir("sucursal")}>Sucursal</button>
            <a href={`tel:${SUCURSAL.tel}`} className="font-medium text-[#111820]">{SUCURSAL.telVisible}</a>
          </div>
          <button onClick={() => setMenu(!menu)} className="sm:hidden -mr-2 p-2" aria-label="Menú" aria-expanded={menu}>
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menu && (
          <div className="sm:hidden border-t border-black/5 px-4 py-2">
            <button onClick={() => ir("modelos")} className="block w-full text-left py-3.5 text-[#111820]">Modelos</button>
            <button onClick={() => ir("sucursal")} className="block w-full text-left py-3.5 text-[#111820]">Sucursal</button>
            <a href={`tel:${SUCURSAL.tel}`} className="block py-3.5 font-medium text-[#111820]">{SUCURSAL.telVisible}</a>
          </div>
        )}
      </nav>

      {/* Hero: la tesis es el precio transparente, no un formulario */}
      <header className="max-w-5xl mx-auto px-4 pt-14 pb-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[#111820]/40 mb-5">
          Distribuidor autorizado · Edo. de México
        </div>
        <h1 className="text-[3.25rem] sm:text-8xl font-semibold tracking-[-0.04em] text-[#111820] leading-[0.9] mb-6">
          Ve la mensualidad
          <br />
          <span className="text-[#111820]/30">antes de dar tus datos.</span>
        </h1>
        <p className="text-[#111820]/60 max-w-lg leading-relaxed text-lg">
          Precios, autonomía y pago mensual calculado al momento. Cuando quieras hablar con un asesor,
          tú decides cuándo.
        </p>
      </header>

      {/* Vehículo destacado con calculadora en vivo */}
      <section className="max-w-5xl mx-auto px-4 pb-4">
        <div className="grid sm:grid-cols-2 gap-3 items-stretch">
          <button onClick={() => setAuto(destacado)}
            className="text-left bg-white rounded-3xl border border-black/5 p-7 flex flex-col hover:border-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#111820]/25">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#111820]/40 mb-3">Más vendida</div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#111820] leading-tight">
              {destacado.modelo}
            </h2>
            <p className="text-sm text-[#111820]/55 mt-2 mb-6 leading-relaxed">{destacado.claim}</p>
            <Silueta color={destacado.color} carroceria={destacado.carroceria} className="w-full max-w-xs mt-auto" />
          </button>
          <Calculadora auto={destacado} compacta />
        </div>
      </section>

      <Inventario onAbrir={setAuto} />
      <Sucursal />

      <footer className="border-t border-black/5 py-10">
        <div className="max-w-5xl mx-auto px-4 text-xs text-[#111820]/40 leading-relaxed">
          <p className="mb-2">{SUCURSAL.nombre} · {SUCURSAL.direccion}</p>
          <p>Precios en pesos mexicanos, sujetos a cambio sin previo aviso. Imágenes ilustrativas.</p>
        </div>
      </footer>
    </div>
  );
}
