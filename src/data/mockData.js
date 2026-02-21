// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const DEMO_CREDENTIALS = { email: 'kasun@dms.lk', password: 'dms123', pin: '1234' }

// ─── CURRENT USER ─────────────────────────────────────────────────────────────
export const USER = {
  id: 1, name: 'Kasun Perera', email: 'kasun@dms.lk',
  team: 'Colombo South', area: 'Dehiwala–Mt Lavinia',
  avatar: 'KP', repId: 'KP-001', grade: 'A+',
  commission: 28450, target_visits: 25, target_orders: 20, target_revenue: 500000,
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export const CUSTOMERS = [
  { id:1, name:'Super Mart – Dehiwala',   short:'Super Mart',     type:'Supermarket', address:'45, Galle Rd, Dehiwala',      phone:'0112 345 678', contact:'Nimal Silva',       balance:45000, credit_limit:100000, last_visit:'14 Feb 2026', area:'Dehiwala',   mx:18, my:36 },
  { id:2, name:'City Pharmacy',           short:'City Pharmacy',  type:'Pharmacy',    address:'12, Hospital Rd, Mt Lavinia', phone:'0112 456 789', contact:'Kamala Fernando',   balance:12000, credit_limit:50000,  last_visit:'18 Feb 2026', area:'Mt Lavinia', mx:44, my:52 },
  { id:3, name:'Lanka Wholesale Pvt Ltd', short:'Lanka Wholesale',type:'Wholesale',   address:'78, Baseline Rd, Col 9',      phone:'0112 567 890', contact:'Roshan Perera',     balance:89000, credit_limit:200000, last_visit:'10 Feb 2026', area:'Colombo 9',  mx:70, my:28 },
  { id:4, name:'Hotel Sunny Beach',       short:'Hotel Sunny',    type:'Hotel',       address:'2, Beach Rd, Dehiwala',       phone:'0112 678 901', contact:'Priya Jayawardena', balance:28000, credit_limit:75000,  last_visit:'19 Feb 2026', area:'Dehiwala',   mx:28, my:66 },
  { id:5, name:'Corner Shop Ratmalana',   short:'Corner Shop',    type:'Retailer',    address:'3, Galle Rd, Ratmalana',      phone:'0112 789 012', contact:'Suresh Kumar',      balance:5500,  credit_limit:20000,  last_visit:'20 Feb 2026', area:'Ratmalana',  mx:76, my:74 },
]

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
export const PRODUCTS = [
  { id:1,  name:'Crystal Water 500ml', sku:'CW500',  cat:'Beverages', price:35,   unit:'btl',   emoji:'💧' },
  { id:2,  name:'Crystal Water 1.5L',  sku:'CW1500', cat:'Beverages', price:75,   unit:'btl',   emoji:'💧' },
  { id:3,  name:'Milo 400g',           sku:'ML400',  cat:'Food',      price:780,  unit:'tin',   emoji:'🍫' },
  { id:4,  name:'Anchor Milk 1L',      sku:'AM1L',   cat:'Dairy',     price:450,  unit:'pk',    emoji:'🥛' },
  { id:5,  name:'Surf Excel 1kg',      sku:'SE1K',   cat:'Detergent', price:650,  unit:'pk',    emoji:'🧺' },
  { id:6,  name:'Dettol 500ml',        sku:'DT500',  cat:'Healthcare',price:550,  unit:'btl',   emoji:'🏥' },
  { id:7,  name:'Maggi Noodles',       sku:'MG72',   cat:'Food',      price:90,   unit:'pk',    emoji:'🍜' },
  { id:8,  name:'Sunlight 400g',       sku:'SL400',  cat:'Detergent', price:180,  unit:'bar',   emoji:'☀️' },
  { id:9,  name:'Panadol 10s',         sku:'PN10',   cat:'Healthcare',price:95,   unit:'strip', emoji:'💊' },
  { id:10, name:'Horlicks 500g',       sku:'HK500',  cat:'Beverages', price:890,  unit:'jar',   emoji:'🥤' },
  { id:11, name:'Roo Bread',           sku:'RB01',   cat:'Food',      price:120,  unit:'loaf',  emoji:'🍞' },
  { id:12, name:'EH Ice Cream 2L',     sku:'EH2L',   cat:'Dairy',     price:1200, unit:'tub',   emoji:'🍦' },
]

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const INITIAL_ORDERS = [
  { id:'SO-2024', cid:1, date:'15 Feb', total:28500, status:'Delivered',  items:5 },
  { id:'SO-2019', cid:1, date:'08 Feb', total:15200, status:'Delivered',  items:3 },
  { id:'SO-2011', cid:2, date:'18 Feb', total:8900,  status:'Delivered',  items:4 },
  { id:'SO-2003', cid:3, date:'12 Feb', total:67400, status:'Delivered',  items:8 },
  { id:'SO-1997', cid:3, date:'05 Feb', total:43200, status:'Delivered',  items:6 },
  { id:'SO-1988', cid:4, date:'19 Feb', total:12800, status:'In Transit', items:3 },
]

// ─── VISIT HISTORY ────────────────────────────────────────────────────────────
export const VISIT_HISTORY = [
  { id:1, cid:1, date:'14 Feb', time:'09:15', notes:'New display arrangement requested',           outcome:'Order Taken' },
  { id:2, cid:1, date:'07 Feb', time:'10:30', notes:'Manager not available, left brochures',       outcome:'Follow-up' },
  { id:3, cid:2, date:'18 Feb', time:'11:00', notes:'Pharmacy expanding, new products discussed',  outcome:'Order Taken' },
  { id:4, cid:3, date:'10 Feb', time:'13:45', notes:'Festival season order expected next month',   outcome:'Order Taken' },
  { id:5, cid:4, date:'19 Feb', time:'14:00', notes:'Hotel renovating, reduced orders temporarily',outcome:'Visit Only' },
]

// ─── ROUTE STOPS ──────────────────────────────────────────────────────────────
export const ROUTE_STOPS = [
  { id:1, cid:1, seq:1, time:'09:00', status:'done'    },
  { id:2, cid:2, seq:2, time:'10:30', status:'done'    },
  { id:3, cid:3, seq:3, time:'12:00', status:'active'  },
  { id:4, cid:4, seq:4, time:'14:00', status:'pending' },
  { id:5, cid:5, seq:5, time:'15:30', status:'pending' },
]

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const INITIAL_NOTIFICATIONS = [
  { id:1, title:'New Route Assigned',     body:'Route A – South Colombo assigned for today',       time:'7:30 AM',   read:false, icon:'🗺️' },
  { id:2, title:'Order SO-2024 Approved', body:'Your order for Super Mart has been approved',      time:'Yesterday', read:false, icon:'✅' },
  { id:3, title:'Credit Limit Warning',   body:'Lanka Wholesale is at 89% of their credit limit', time:'Yesterday', read:true,  icon:'⚠️' },
  { id:4, title:'Target Reminder',        body:'72% of weekly visit target reached — keep going!', time:'Monday',    read:true,  icon:'🎯' },
]

// ─── CHART DATA ───────────────────────────────────────────────────────────────
export const WEEKLY_STATS = [
  { day:'Mon',   visits:6, rev:45   },
  { day:'Tue',   visits:5, rev:32   },
  { day:'Wed',   visits:7, rev:78   },
  { day:'Thu',   visits:4, rev:41   },
  { day:'Fri',   visits:6, rev:56   },
  { day:'Sat',   visits:3, rev:22   },
  { day:'Today', visits:2, rev:18.5 },
]

// ─── DEMO DELIVERY ITEMS (for POD screen) ─────────────────────────────────────
export const DEMO_DELIVERY_ITEMS = [
  { name:'Crystal Water 500ml', qty:24, price:35  },
  { name:'Milo 400g',           qty:6,  price:780 },
  { name:'Anchor Milk 1L',      qty:12, price:450 },
]

// ─── INITIAL VISIT STATUS ─────────────────────────────────────────────────────
export const INITIAL_VISIT_STATUS = { 1:'done', 2:'done', 3:'active', 4:'pending', 5:'pending' }
