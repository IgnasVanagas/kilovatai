import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  CheckCheck,
  ChevronDown,
  Copy,
  FileCheck2,
  House,
  Menu,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sun,
  X,
  Zap,
  Leaf,
  Factory,
  Sprout,
} from "lucide-react";

const audiences = {
  home: {
    label: "Namams",
    icon: House,
    solarTitle: "Saulės elektrinės",
    solarText:
      "Jūsų stogas gali daugiau. Gaminkite savo elektrą ir kurkite energetiškai savarankiškus namus.",
    solarDetail:
      "Pagal jūsų elektros vartojimą, stogo galimybes ir poreikius parenkame saulės elektrinės komplektą. Atvykstame į vietą, įvertiname sąlygas ir paruošiame tikslų pasiūlymą.",
    chargingText:
      "Patogus įkrovimas prasideda namuose. Įkraukite automobilį, kol ilsitės.",
  },
  business: {
    label: "Verslui",
    icon: Factory,
    solarTitle: "Saulės elektrinės verslui",
    solarText:
      "Paverskite įmonės stogą energijos šaltiniu. Sprendimai, pritaikyti jūsų verslo vartojimui.",
    solarDetail:
      "Įvertiname jūsų verslo elektros vartojimą ir objekto galimybes. Projektuojame, įrengiame ir prižiūrime saulės elektrinę, pritaikytą įmonės poreikiams.",
    chargingText:
      "Įkrovimo sprendimai jūsų komandai ir klientams. Daugiau vertės jūsų verslo erdvei.",
  },
  farm: {
    label: "Ūkiui",
    icon: Sprout,
    solarTitle: "Saulės elektrinės ūkiui",
    solarText:
      "Įdarbinkite saulę savo ūkyje. Energija, pritaikyta ūkio darbams ir sezoniškumui.",
    solarDetail:
      "Padedame pasirinkti saulės elektrinę pagal ūkio elektros poreikį, sezoniškumą ir turimas erdves. Atvykstame į ūkį ir paruošiame individualų techninį pasiūlymą.",
    chargingText:
      "Patogus elektromobilių įkrovimas jūsų ūkyje. Suprojektuosime ir įrengsime.",
  },
};

const services = {
  solar: {
    title: "Saulės elektrinės",
    icon: Sun,
    points: [
      "Individualus elektrinės komplekto parinkimas",
      "Objekto apžiūra ir tikslus pasiūlymas",
      "Projektavimas, įrengimas ir eksploatavimas",
      "Patikimų pasaulio gamintojų įranga",
    ],
  },
  charging: {
    title: "Įkrovimo stotelės",
    icon: Zap,
    description:
      "Patogiai įkraukite elektromobilį ten, kur praleidžiate daugiausia laiko. Parenkame jūsų poreikius ir elektros įvado galimybes atitinkančią stotelę, ją suprojektuojame ir įrengiame.",
    points: [
      "Stotelės parinkimas pagal jūsų poreikius",
      "Elektros įvado ir įrengimo vietos įvertinimas",
      "Profesionalus projektavimas ir montavimas",
      "Įrangos eksploatavimo priežiūra",
    ],
  },
  documents: {
    title: "Dokumentai? Pasirūpinsime.",
    icon: FileCheck2,
    description:
      "Techniniai sprendimai ir dokumentai – vienose rankose. Padėsime užpildyti ESO gaminančio vartotojo paraišką, paruošime APVA sistemai reikiamus dokumentus ir padėsime juos pateikti.",
    points: [
      "Pagalba pildant ESO paraišką",
      "APVA dokumentų parengimas",
      "Pagalba pateikiant dokumentus",
      "Aiškūs atsakymai kiekviename žingsnyje",
    ],
  },
};

const steps = [
  {
    title: "Pasikalbame",
    text: "Išgirstame jūsų poreikius, įvertiname elektros vartojimą ir atsakome į klausimus.",
  },
  {
    title: "Atvykstame ir suplanuojame",
    text: "Apžiūrime objektą, parenkame įrangą ir pateikiame aiškų, individualų pasiūlymą.",
  },
  {
    title: "Įrengiame ir sutvarkome",
    text: "Profesionaliai įrengiame elektrinę ir padedame su ESO bei APVA dokumentais.",
  },
  {
    title: "Jūs gaminate. Mes šalia.",
    text: "Pradedate naudoti savo energiją. Mes liekame šalia dėl priežiūros ir konsultacijų.",
  },
];

const questions = [
  {
    title: "Nuo ko pradėti, jei noriu saulės elektrinės?",
    answer:
      "Pradėkite nuo pokalbio su mumis. Aptarsime jūsų metinį elektros suvartojimą, turimą stogą ar sklypą ir lūkesčius. Tuomet atvyksime į vietą, įvertinsime galimybes ir pateiksime individualų pasiūlymą.",
  },
  {
    title: "Ar padedate su ESO ir APVA dokumentais?",
    answer:
      "Taip. Padedame užpildyti ESO gaminančio vartotojo paraišką, paruošiame APVA sistemai reikalingus dokumentus ir padedame juos pateikti. Konkrečios paramos galimybes vertiname pagal tuo metu galiojančias kvietimo sąlygas.",
  },
  {
    title: "Kaip parenkate saulės elektrinės galią?",
    answer:
      "Elektrinės galią parenkame pagal jūsų elektros vartojimą, stogo plotą, kryptį, šešėlius ir prijungimo galimybes. Atsižvelgiame ir į planuojamus pokyčius, pavyzdžiui, elektromobilį ar šilumos siurblį.",
  },
  {
    title: "Ar įrengiate elektromobilių įkrovimo stoteles?",
    answer:
      "Taip, projektuojame, įrengiame ir prižiūrime elektromobilių įkrovimo stoteles. Sprendimą parenkame pagal jūsų automobilį, elektros įvadą ir įkrovimo vietą – namuose, įmonėje ar ūkyje.",
  },
];

function SunMark({ className = "" }) {
  return (
    <svg
      className={`sun-mark ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="5.3">
        <path d="M20 1v38M1 20h38M6.6 6.6l26.8 26.8M6.6 33.4L33.4 6.6" />
      </g>
    </svg>
  );
}

function Logo({ light = false, onClick }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href="#pradzia"
      aria-label="Kilovatai – į pradžią"
      onClick={onClick}
    >
      <SunMark />
      <span>
        kilovatai<span className="logo-period">.</span>
      </span>
    </a>
  );
}

function Dialog({ children, onClose, titleId, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="icon-button dialog-close"
        aria-label="Uždaryti langą"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}

function ContactForm({ request, audience }) {
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const formSection = useRef(null);
  const formHeading = useRef(null);
  const nameInput = useRef(null);
  const resultHeading = useRef(null);
  useEffect(() => {
    if (draft) resultHeading.current?.focus();
  }, [draft]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Saulės elektrinė",
    location: "",
    message: "",
  });
  useEffect(() => {
    if (!request) return;
    setForm((previous) => ({ ...previous, service: request.service }));
    setDraft(null);
    setCopied(false);
    setCopyError(false);
    const frame = requestAnimationFrame(() => {
      formHeading.current?.focus({ preventScroll: true });
      formSection.current?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [request]);
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const text = `Sveiki, domina ${form.service.toLocaleLowerCase("lt-LT")} (${audiences[audience].label.toLocaleLowerCase("lt-LT")}).\nVardas: ${form.name.trim()}\nTelefonas: ${form.phone.trim()}${form.location.trim() ? `\nVietovė: ${form.location.trim()}` : ""}${form.message.trim() ? `\n\n${form.message.trim()}` : ""}`;
    setDraft(text);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <div id="contact-form" className="contact-form" ref={formSection}>
      {!draft ? (
        <>
          <h3 id="inquiry-title" tabIndex={-1} ref={formHeading}>
            Papasakokite apie savo planus.
          </h3>
          <p className="form-intro">
            Užpildykite formą ir perduokite mums užklausą SMS žinute.
          </p>
          <form onSubmit={submit} aria-labelledby="inquiry-title">
            <div className="form-grid">
              <label>
                Jūsų vardas
                <input
                  ref={nameInput}
                  autoComplete="given-name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Vardas"
                  required
                  maxLength={80}
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Telefono numeris
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update}
                  placeholder="+370"
                  required
                  pattern="[+]?(?:[0-9][\s\-]*){7,15}"
                  title="Įveskite telefono numerį, pvz., +370 600 00000"
                />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Kas jus domina?
                <select name="service" value={form.service} onChange={update}>
                  <option>Saulės elektrinė</option>
                  <option>Įkrovimo stotelė</option>
                  <option>ESO ir APVA dokumentai</option>
                  <option>Konsultacija</option>
                </select>
              </label>
              <label>
                Miestas ar rajonas <span>(nebūtina)</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={update}
                  autoComplete="address-level2"
                  placeholder="Pvz., Kaunas"
                  maxLength={100}
                />
              </label>
            </div>
            <label>
              Papildoma informacija <span>(nebūtina)</span>
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                placeholder="Poreikiai, klausimai, planai..."
                rows={3}
                maxLength={1000}
              />
            </label>
            <button type="submit" className="button button-dark form-submit">
              Paruošti užklausą <ArrowRight size={18} />
            </button>
            <p className="form-note">
              Šiame žingsnyje duomenys nesiunčiami. SMS galėsite peržiūrėti
              prieš išsiųsdami.
            </p>
          </form>
        </>
      ) : (
        <>
          <div className="dialog-symbol">
            <CheckCheck size={27} />
          </div>
          <h3 id="inquiry-title" tabIndex={-1} ref={resultHeading}>
            Jūsų užklausa paruošta.
          </h3>
          <p className="form-intro">
            Ji dar neišsiųsta. Atidarykite SMS programėlę arba nukopijuokite
            tekstą ir siųskite numeriu <strong>+370 666 09997.</strong>
          </p>
          <textarea
            className="draft-preview"
            aria-label="Paruoštos užklausos tekstas"
            value={draft}
            readOnly
            rows={7}
          />
          <div className="draft-actions">
            <a
              className="button button-dark"
              href={`sms:+37066609997${/iPad|iPhone|iPod/.test(navigator.userAgent) ? "&" : "?"}body=${encodeURIComponent(draft)}`}
            >
              <MessageSquare size={18} /> Atidaryti SMS
            </a>
            <button className="button button-outline" onClick={copy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Nukopijuota" : "Kopijuoti tekstą"}
            </button>
          </div>
          <p className="form-note" role="status">
            {copyError
              ? "Pažymėkite tekstą aukščiau ir nukopijuokite jį savo įrenginio kopijavimo komanda."
              : copied
                ? "Tekstas nukopijuotas. Įklijuokite jį savo žinučių programėlėje."
                : "SMS siuntimo kaina priklauso nuo jūsų mobiliojo ryšio plano."}
          </p>
          <button
            className="text-link edit-draft"
            onClick={() => {
              setDraft(null);
              setCopied(false);
              setCopyError(false);
              requestAnimationFrame(() =>
                nameInput.current?.focus({ preventScroll: true }),
              );
            }}
          >
            Grįžti ir redaguoti <ArrowUpRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audience, setAudience] = useState("home");
  const [detail, setDetail] = useState(null);
  const [inquiryRequest, setInquiryRequest] = useState(null);
  const [faq, setFaq] = useState(null);
  const [privacy, setPrivacy] = useState(false);
  const selected = audiences[audience];
  const openInquiry = (service = "Saulės elektrinė") => {
    setMenuOpen(false);
    setDetail(null);
    setInquiryRequest({ service });
  };
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  const chooseTab = (event) => {
    const keys = Object.keys(audiences);
    let index = keys.indexOf(audience);
    if (event.key === "ArrowRight") index = (index + 1) % keys.length;
    else if (event.key === "ArrowLeft")
      index = (index + keys.length - 1) % keys.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = keys.length - 1;
    else return;
    event.preventDefault();
    setAudience(keys[index]);
    document.getElementById(`tab-${keys[index]}`)?.focus();
  };

  return (
    <>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>
      <header className="header" id="pradzia">
        <div className="nav-wrap">
          <Logo onClick={() => setMenuOpen(false)} />
          <nav
            className={`nav ${menuOpen ? "is-open" : ""}`}
            id="main-navigation"
            aria-label="Pagrindinė navigacija"
          >
            <a href="#sprendimai" onClick={() => setMenuOpen(false)}>
              Sprendimai
            </a>
            <a href="#procesas" onClick={() => setMenuOpen(false)}>
              Kaip dirbame
            </a>
            <a href="#apie-mus" onClick={() => setMenuOpen(false)}>
              Apie mus
            </a>
            <a href="#kontaktai" onClick={() => setMenuOpen(false)}>
              Kontaktai
            </a>
            <a className="mobile-phone" href="tel:+37066609997">
              <Phone size={16} /> +370 666 09997
            </a>
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href="tel:+37066609997">
              <Phone size={15} /> +370 666 09997
            </a>
            <button
              className="button button-lime nav-cta"
              onClick={() => openInquiry()}
            >
              Pasikalbėkime <ArrowUpRight size={17} />
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label={menuOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main id="turinys">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/solar-home.webp"
            alt="Modernus namas gamtos apsuptyje su saulės moduliais ant stogo"
            fetchPriority="high"
            width="1536"
            height="1024"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <h1 id="hero-title">
              Saulė dirba.
              <br />
              <span>Jūs gyvenate.</span>
            </h1>
            <p>
              Saulės energijos sprendimai jūsų namams,
              <br className="desktop-break" /> verslui ir ūkiui. Nuo pirmo
              pokalbio
              <br className="desktop-break" /> iki pirmo kilovato.
            </p>
            <div className="hero-actions">
              <button
                className="button button-lime"
                onClick={() => openInquiry()}
              >
                Atraskime jūsų sprendimą <ArrowUpRight size={20} />
              </button>
              <a className="hero-secondary" href="#sprendimai">
                Mūsų paslaugos <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="hero-proof">
              <ShieldCheck size={19} />
              <span>Sertifikuoti specialistai</span>
              <span className="proof-divider" />
              <span>Pagalba su ESO ir APVA</span>
            </div>
            <div className="hero-note">
              <SunMark />
              <p>
                Švari energija.
                <br />
                <span>Ramesnis rytojus.</span>
              </p>
            </div>
          </div>
        </section>

        <section
          className="partners container"
          aria-label="Mūsų atstovaujami gamintojai"
        >
          <p>
            Patikimi vardai.
            <br />
            <span>Patikima energija.</span>
          </p>
          <div className="brand-row">
            <span className="brand brand-sharp">SHARP</span>
            <span className="brand brand-fronius">
              fronius
              <span className="fronius-line" />
            </span>
            <span className="brand brand-trina">
              Trina<span>Solar</span>
            </span>
            <span className="brand brand-huawei">
              <svg viewBox="0 0 36 28" aria-hidden="true">
                <g fill="currentColor">
                  <ellipse
                    cx="13"
                    cy="10"
                    rx="4"
                    ry="10"
                    transform="rotate(-18 13 10)"
                  />
                  <ellipse
                    cx="23"
                    cy="10"
                    rx="4"
                    ry="10"
                    transform="rotate(18 23 10)"
                  />
                  <ellipse
                    cx="7"
                    cy="15"
                    rx="4"
                    ry="9"
                    transform="rotate(-49 7 15)"
                  />
                  <ellipse
                    cx="29"
                    cy="15"
                    rx="4"
                    ry="9"
                    transform="rotate(49 29 15)"
                  />
                  <path d="M0 20l16 6H3zm36 0l-16 6h13z" />
                </g>
              </svg>
              HUAWEI
            </span>
            <span className="brand brand-sungrow">
              SUNGROW
              <Sun size={13} />
            </span>
            <span className="brand brand-solaredge">
              solaredge<span>®</span>
            </span>
          </div>
        </section>

        <section className="solutions section-space" id="sprendimai">
          <div className="container">
            <div className="section-heading">
              <h2>
                Jūsų poreikiai.
                <br />
                <span>Mūsų sprendimai.</span>
              </h2>
              <div className="section-heading-aside">
                <p>
                  Kiekvienas namas, verslas ir ūkis – skirtingas.
                  <br />
                  Randame sprendimą, kuris tinka būtent jums.
                </p>
                <div
                  className="audience-tabs"
                  role="tablist"
                  aria-label="Sprendimai pagal poreikį"
                >
                  {Object.entries(audiences).map(([key, item]) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={key}
                        role="tab"
                        id={`tab-${key}`}
                        aria-selected={audience === key}
                        aria-controls="services-panel"
                        tabIndex={audience === key ? 0 : -1}
                        onClick={() => setAudience(key)}
                        onKeyDown={chooseTab}
                      >
                        <Icon size={15} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className="service-grid"
              id="services-panel"
              role="tabpanel"
              aria-labelledby={`tab-${audience}`}
              tabIndex={0}
            >
              <article className="service-card">
                <div className="service-image solar-card-image">
                  <img
                    src="/images/solar-home.webp"
                    alt="Saulės moduliai ant namo stogo"
                    loading="lazy"
                    width="1536"
                    height="1024"
                  />
                  <span className="image-icon">
                    <Sun size={19} />
                  </span>
                </div>
                <div className="service-copy">
                  <h3>{selected.solarTitle}</h3>
                  <p>{selected.solarText}</p>
                  <button
                    className="service-link"
                    onClick={() => setDetail("solar")}
                    aria-label={`Plačiau: ${selected.solarTitle}`}
                  >
                    Atrasti sprendimą <ArrowUpRight size={20} />
                  </button>
                </div>
              </article>
              <article className="service-card">
                <div className="service-image">
                  <img
                    src="/images/ev-charger.webp"
                    alt="Elektromobilio įkrovimo stotelė prie namo"
                    loading="lazy"
                    width="1536"
                    height="1024"
                  />
                  <span className="image-icon">
                    <Zap size={19} />
                  </span>
                </div>
                <div className="service-copy">
                  <h3>Įkrovimo stotelės</h3>
                  <p>{selected.chargingText}</p>
                  <button
                    className="service-link"
                    onClick={() => setDetail("charging")}
                    aria-label="Plačiau: įkrovimo stotelės"
                  >
                    Atrasti sprendimą <ArrowUpRight size={20} />
                  </button>
                </div>
              </article>
              <article className="service-card documents-card">
                <div className="document-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="paper paper-back" />
                  <div className="paper paper-front">
                    <SunMark />
                    <span className="paper-title">Viskas savo vietose.</span>
                    <div className="paper-line">
                      <Check size={12} />
                      <span>ESO paraiška</span>
                    </div>
                    <div className="paper-line">
                      <Check size={12} />
                      <span>APVA dokumentai</span>
                    </div>
                    <div className="paper-rule" />
                    <div className="paper-rule short" />
                  </div>
                  <span className="document-check">
                    <Check size={25} />
                  </span>
                </div>
                <div className="service-copy">
                  <h3>Mažiau rūpesčių jums.</h3>
                  <p>
                    Nuo ESO paraiškos iki APVA dokumentų. Biurokratiją palikite
                    mūsų komandai.
                  </p>
                  <button
                    className="service-link"
                    onClick={() => setDetail("documents")}
                    aria-label="Plačiau: ESO ir APVA dokumentai"
                  >
                    Kaip padedame <ArrowUpRight size={20} />
                  </button>
                </div>
              </article>
            </div>
            <div className="solutions-note">
              <span>
                <Check size={15} /> Individualus įrangos parinkimas
              </span>
              <span>
                <Check size={15} /> Profesionalus įrengimas
              </span>
              <span>
                <Check size={15} /> Pagalba ir po įrengimo
              </span>
            </div>
          </div>
        </section>

        <section className="process container section-space" id="procesas">
          <div className="section-heading">
            <h2>
              Nuo „galvoju“
              <br />
              iki „gaminu“.
            </h2>
            <p className="process-intro">
              Aiškus kelias į nuosavą energiją.
              <br />
              Kiekviename žingsnyje – kartu.
            </p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <article className="step" key={step.title}>
                <div className="step-number">
                  <span>0{index + 1}</span>
                  {index === 3 ? <Sun size={21} /> : <ArrowRight size={20} />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about container" id="apie-mus">
          <div className="about-image">
            <img
              src="/images/solar-detail.webp"
              alt="Saulės elektrinės moduliai saulėtoje, žalioje aplinkoje"
              loading="lazy"
              width="900"
              height="1350"
            />
            <div className="about-image-note">
              <Leaf size={21} />
              <span>
                Maži sprendimai šiandien.
                <br />
                Didesni pokyčiai rytoj.
              </span>
            </div>
          </div>
          <div className="about-content">
            <h2>
              Gera energija.
              <br />
              Iš gerų rankų.
            </h2>
            <p className="about-lead">
              Esame „Kilovatai“ – saulės energetikos specialistai, kuriems
              svarbus ne tik rezultatas, bet ir jūsų ramybė.
            </p>
            <p>
              Projektuojame, įrengiame ir prižiūrime saulės elektrines bei
              elektromobilių įkrovimo stoteles. Parenkame tai, ko iš tiesų
              reikia jūsų namams, verslui ar ūkiui.
            </p>
            <p>
              Dirbame su pasaulyje pripažintais gamintojais, o kokybę grindžiame
              sertifikuotais procesais ir atsakingu požiūriu į kiekvieną
              projektą.
            </p>
            <div className="certifications">
              <div>
                <ShieldCheck size={24} />
                <span>
                  <strong>ISO 9001</strong>
                  <small>Kokybės vadyba</small>
                </span>
              </div>
              <div>
                <Leaf size={24} />
                <span>
                  <strong>ISO 14001</strong>
                  <small>Aplinkosauga</small>
                </span>
              </div>
            </div>
            <button
              className="text-link"
              onClick={() => openInquiry("Konsultacija")}
            >
              Susipažinkime <ArrowUpRight size={18} />
            </button>
          </div>
        </section>

        <section className="faq container section-space">
          <div className="faq-intro">
            <h2>
              Geri klausimai.
              <br />
              Aiškūs atsakymai.
            </h2>
            <p>
              Nerandate savo atsakymo?
              <br />
              Mielai pasikalbėsime.
            </p>
            <a className="text-link" href="tel:+37066609997">
              <Phone size={17} /> +370 666 09997
            </a>
          </div>
          <div className="faq-list">
            {questions.map((question, index) => (
              <div
                className={`faq-item ${faq === index ? "expanded" : ""}`}
                key={question.title}
              >
                <h3>
                  <button
                    aria-expanded={faq === index}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    onClick={() => setFaq(faq === index ? null : index)}
                  >
                    {question.title}
                    <ChevronDown size={19} />
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={faq !== index}
                >
                  <p>{question.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="contact"
          id="kontaktai"
          aria-labelledby="contact-title"
        >
          <div className="contact-inner container">
            <div className="contact-main">
              <h2 id="contact-title">
                Saulė jau pasiruošusi.
                <br />
                <span>O jūs?</span>
              </h2>
              <p>
                Susitikime mūsų padalinyje Kaune.
                <br />
                Arba jūsų kieme. Pradėkime nuo pokalbio.
              </p>
              <div className="contact-details">
                <a className="contact-phone" href="tel:+37066609997">
                  +370 666 09997 <ArrowUpRight size={23} />
                </a>
                <div className="contact-addresses">
                  <div>
                    <span>Susitikime Kaune</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kaunakiemio+g.+5+Kaunas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kaunakiemio g. 5, Kaunas <ArrowUpRight size={15} />
                    </a>
                  </div>
                  <div>
                    <span>Įmonės adresas</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kranto+g.+38+Jurbarkas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kranto g. 38, LT-44327 Jurbarkas{" "}
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm request={inquiryRequest} audience={audience} />
          </div>
        </section>
      </main>

      <footer className="footer container">
        <div className="footer-top">
          <Logo />
          <p>Saulės energija. Žmonių labui.</p>
          <a className="back-top" href="#pradzia">
            Į viršų <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} UAB Kilovatai. Visos teisės saugomos.
          </span>
          <div>
            <span>Kurta šviesesniam rytojui.</span>
            <button onClick={() => setPrivacy(true)}>Privatumas</button>
          </div>
        </div>
      </footer>

      {detail && (
        <Dialog onClose={() => setDetail(null)} titleId="detail-title">
          <div className="dialog-symbol">
            {(() => {
              const Icon = services[detail].icon;
              return <Icon size={27} />;
            })()}
          </div>
          <h2 id="detail-title">
            {detail === "solar" ? selected.solarTitle : services[detail].title}
          </h2>
          <p className="dialog-intro">
            {detail === "solar"
              ? selected.solarDetail
              : services[detail].description}
          </p>
          <ul className="detail-list">
            {services[detail].points.map((point) => (
              <li key={point}>
                <Check size={18} />
                {point}
              </li>
            ))}
          </ul>
          <button
            className="button button-dark form-submit"
            onClick={() =>
              openInquiry(
                detail === "solar"
                  ? "Saulės elektrinė"
                  : detail === "charging"
                    ? "Įkrovimo stotelė"
                    : "ESO ir APVA dokumentai",
              )
            }
          >
            Aptarkime jūsų projektą <ArrowUpRight size={18} />
          </button>
        </Dialog>
      )}
      {privacy && (
        <Dialog onClose={() => setPrivacy(false)} titleId="privacy-title">
          <div className="dialog-symbol">
            <ShieldCheck size={27} />
          </div>
          <h2 id="privacy-title">Jūsų privatumas</h2>
          <div className="privacy-copy">
            <p>
              Šioje svetainėje nenaudojami analitikos ar reklaminiai slapukai.
              Formoje įrašyta informacija laikoma tik atidaryto puslapio
              atmintyje ir nėra siunčiama į serverį.
            </p>
            <p>
              Pasirinkus „Atidaryti SMS“, jūsų įrenginio žinučių programėlėje
              atidaromas užklausos tekstas. Žinutę įmonei išsiunčiate patys.
              Pasirinkus „Kopijuoti tekstą“, jis nukopijuojamas į jūsų įrenginio
              iškarpinę.
            </p>
            <p>
              Susisiekus su UAB Kilovatai, jūsų pateikta informacija naudojama
              atsakymui į užklausą ir pasiūlymui aptarti. Dėl savo pateiktų
              duomenų kreipkitės telefonu{" "}
              <a href="tel:+37066609997">+370 666 09997</a>.
            </p>
            <p>
              Žemėlapių nuorodos atidaro „Google Maps“, kuriam taikomos jo
              paslaugos privatumo sąlygos.
            </p>
          </div>
        </Dialog>
      )}
    </>
  );
}
