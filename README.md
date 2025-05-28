# Sushify – Sistema di Ordinazione per Ristorante Sushi

Sushify è un sistema completo di ordinazione per ristoranti sushi, composto da due applicazioni principali: un sistema tablet per i clienti e una console di gestione per il personale.

## Struttura del Progetto

Il progetto è suddiviso in due componenti principali:

* **TABLET**: Sistema di ordinazione lato cliente eseguito su tablet

  * Frontend: applicazione React (TypeScript)
  * Backend: server Python FastAPI
* **CONSOLE**: Sistema di gestione lato staff per il trattamento delle ordinazioni

  * Frontend: applicazione React (TypeScript)
  * Backend: server Python FastAPI
* **DB**: Schema del database e dati di esempio in formato SQL

## Funzionalità del Sistema

### Applicazione TABLET

* **Ordinazione Self-Service**

  * Navigazione del menù per categorie
  * Personalizzazione dei piatti (rimozione ingredienti)
  * Informazioni sulle allergie
  * Gestione in tempo reale del carrello
  * Visualizzazione della cronologia ordini

* **Tipologie di Menù**

  * “All You Can Eat” (piatti inclusi a prezzo fisso)
  * À la carte (pagamento per singolo piatto)
  * Prezzi differenziati per pranzo/cena e giorni feriali/festivi

* **Gestione dei Tavoli**

  * Selezione del tavolo tramite interfaccia
  * Monitoraggio dello stato del tavolo

### Applicazione CONSOLE

* **Gestione Ordini**

  * Notifiche in tempo reale per nuovi ordini
  * Tracciamento dello stato (nuovo, in lavorazione, completato)
  * Evidenziazione degli ordini urgenti
  * Visualizzazione dettagliata di modifiche e allergie

* **Autenticazione del Personale**

  * Sistema di login per accesso riservato allo staff

## Tecnologie Utilizzate

### Frontend (TABLET & CONSOLE)

* **Framework**: React 18
* **Linguaggio**: TypeScript
* **Styling**: TailwindCSS
* **Routing**: React Router
* **Icone**: Lucide React
* **Build Tool**: Vite
* **HTTP Client**: Axios (solo CONSOLE)

### Backend (TABLET & CONSOLE)

* **Framework**: FastAPI (Python)
* **Database**: MySQL/MariaDB
* **Gestione CORS**: Middleware integrato di FastAPI
* **Modelli**: Pydantic

### Database

* **Engine**: MySQL/MariaDB
* **Schema**: include tabelle per piatti, ingredienti, ordini, personalizzazioni, tavoli, configurazioni menù, personale

## Prerequisiti

* Python 3.8+
* Node.js 18+
* Database MySQL/MariaDB

## Installazione e Avvio

1. **Configurazione Database**

   * Importare lo schema da `sushify.sql`

2. **Applicazione TABLET**

   * Su Windows: eseguire `quickstart.bat`
   * Manuale:

     ```bash
     cd TABLET/backend
     python main.py

     cd TABLET/frontend
     npm install
     npm run dev
     ```
   * Accesso: `http://localhost:5171/table-select`

3. **Applicazione CONSOLE**

   * Su Windows: eseguire `quickstart.bat`
   * Manuale:

     ```bash
     cd CONSOLE/backend
     python main.py

     cd CONSOLE/frontend
     npm install
     npm run dev
     ```
   * Accesso: `http://localhost:7070/`

## API Endpoints

### Backend TABLET (porta 8080)

* **Menù**

  * `GET /menu` – Elenco di tutti i menù disponibili
  * `GET /menu/{menu_id}` – Dettagli di un menù specifico

* **Piatti**

  * `GET /piatto/{piatto_id}` – Dettagli del piatto
  * `GET /piatto/{piatto_id}/modifica` – Ingredienti modificabili
  * `POST /piatto/{piatto_id}/modifica` – Aggiunge il piatto personalizzato al carrello

* **Ordini**

  * `POST /ordine` – Crea un nuovo ordine
  * `GET /ordine/tavolo/{table_number}` – Cronologia ordini per tavolo

### Backend CONSOLE (porta 9090)

* **Autenticazione**

  * `POST /token` – Endpoint di login

* **Gestione Ordini**

  * `GET /api/orders` – Elenco ordini
  * `PUT /api/orders/{order_id}/status` – Aggiorna lo stato di un ordine

## Modalità di Sviluppo

#### TABLET

```bash
cd TABLET/frontend
npm install
npm run dev    # http://localhost:5171

cd TABLET/backend
python main.py # http://localhost:8080
```

#### CONSOLE

```bash
cd CONSOLE/frontend
npm install
npm run dev    # http://localhost:7070

cd CONSOLE/backend
python main.py # http://localhost:9090
```

## Schema del Database

Tabelle principali:

* `piatto` – Dati dei piatti (nome, prezzo, categoria)
* `componenti` – Ingredienti con informazioni allergiche
* `piatto_componenti` – Relazione piatto–ingredienti
* `menu` – Tipologie di menù e relativi prezzi
* `piatto_menu` – Relazione piatto–menù
* `ordine` – Ordini con stato
* `ordine_piatto` – Piatti inclusi in un ordine
* `personalizzazioni` – Modifiche (es. rimozione ingredienti)
* `tavolo` – Informazioni sui tavoli
* `tavolata` – Sessioni di occupazione del tavolo

## Contributori

Progetto sviluppato per fornire un sistema completo di ordinazione e gestione, con chiara separazione tra interfaccia cliente e interfaccia staff.

## Licenza

Proprietario – Tutti i diritti riservati.
