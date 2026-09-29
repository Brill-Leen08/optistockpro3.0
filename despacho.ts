

export enum ModuleType {

    DESPACHO = "DESPACHO",

    INGRESO = "INGRESO",

    COMBINADO = "COMBINADO"

}


//======================================================
// NIVELES DE AYUDA
//======================================================

export enum HelpLevel {

    GUIADO = 1,

    SUGERENCIA = 2,

    LIBRE = 3

}


//======================================================
// PRODUCTO
//======================================================

export interface Product {

    sku: string;

    name: string;

    category: string;

    quantity: number;

    weight: number;

}


//======================================================
// PEDIDO
//======================================================

export interface Order {

    id: string;

    module: ModuleType;

    products: Product[];

    createdAt: Date;

}


//======================================================
// RUTA
//======================================================

export interface Route {

    id: number;

    distance: number;

    estimatedTime: number;

    fuel: number;

    efficiency: number;

}


//======================================================
// RESULTADO DEL SUBNIVEL
//======================================================

export interface SessionResult {

    expectedProducts: number;

    processedProducts: number;

    correctProducts: number;

    errors: number;

    totalTime: number;

    fuelUsed: number;

    efficiency: number;

    score: number;

    approved: boolean;

}


//======================================================
// MISIÓN ACTIVA
//======================================================

export interface Mission {

    module: ModuleType;

    sublevel: HelpLevel;

    order: Order;

    routes: Route[];

    startTime: number;

    timeLimit: number;

}
//======================================================
// CATÁLOGO GENERAL DE PRODUCTOS
//======================================================

export const PRODUCT_CATALOG: Product[] = [

    { sku: "ELE-001", name: "Laptop Dell", category: "Electrónicos", quantity: 1, weight: 2.5 },
    { sku: "ELE-002", name: "Monitor LG 24", category: "Electrónicos", quantity: 1, weight: 4.2 },
    { sku: "ELE-003", name: "Teclado Mecánico", category: "Electrónicos", quantity: 1, weight: 1.1 },
    { sku: "ELE-004", name: "Mouse Inalámbrico", category: "Electrónicos", quantity: 1, weight: 0.4 },
    { sku: "ELE-005", name: "Impresora HP", category: "Electrónicos", quantity: 1, weight: 7.6 },

    { sku: "ALI-001", name: "Caja de Arroz", category: "Alimentos", quantity: 1, weight: 12 },
    { sku: "ALI-002", name: "Aceite Vegetal", category: "Alimentos", quantity: 1, weight: 8 },
    { sku: "ALI-003", name: "Azúcar", category: "Alimentos", quantity: 1, weight: 10 },
    { sku: "ALI-004", name: "Frijol", category: "Alimentos", quantity: 1, weight: 15 },
    { sku: "ALI-005", name: "Harina", category: "Alimentos", quantity: 1, weight: 20 },

    { sku: "FER-001", name: "Caja de Tornillos", category: "Ferretería", quantity: 1, weight: 6 },
    { sku: "FER-002", name: "Taladro", category: "Ferretería", quantity: 1, weight: 8 },
    { sku: "FER-003", name: "Martillo", category: "Ferretería", quantity: 1, weight: 2 },
    { sku: "FER-004", name: "Pintura", category: "Ferretería", quantity: 1, weight: 14 },
    { sku: "FER-005", name: "Llave Inglesa", category: "Ferretería", quantity: 1, weight: 3 },

    { sku: "LIM-001", name: "Detergente", category: "Limpieza", quantity: 1, weight: 5 },
    { sku: "LIM-002", name: "Cloro", category: "Limpieza", quantity: 1, weight: 7 },
    { sku: "LIM-003", name: "Escoba", category: "Limpieza", quantity: 1, weight: 2 },
    { sku: "LIM-004", name: "Jabón", category: "Limpieza", quantity: 1, weight: 3 },
    { sku: "LIM-005", name: "Desinfectante", category: "Limpieza", quantity: 1, weight: 4 },

    { sku: "MED-001", name: "Guantes Médicos", category: "Salud", quantity: 1, weight: 1 },
    { sku: "MED-002", name: "Mascarillas", category: "Salud", quantity: 1, weight: 1 },
    { sku: "MED-003", name: "Alcohol", category: "Salud", quantity: 1, weight: 2 },
    { sku: "MED-004", name: "Botiquín", category: "Salud", quantity: 1, weight: 5 },
    { sku: "MED-005", name: "Jeringas", category: "Salud", quantity: 1, weight: 1 },

    { sku: "BEB-001", name: "Agua Embotellada", category: "Bebidas", quantity: 1, weight: 10 },
    { sku: "BEB-002", name: "Refresco", category: "Bebidas", quantity: 1, weight: 12 },
    { sku: "BEB-003", name: "Jugo", category: "Bebidas", quantity: 1, weight: 8 },
    { sku: "BEB-004", name: "Café", category: "Bebidas", quantity: 1, weight: 6 },
    { sku: "BEB-005", name: "Leche", category: "Bebidas", quantity: 1, weight: 11 }

];

//======================================================
// GENERADOR DE PEDIDOS
//======================================================

function random(min: number, max: number): number {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


function shuffle<T>(array: T[]): T[] {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}


export function generateOrder(
    module: ModuleType,
    totalProducts: number = 5
): Order {

    const availableProducts = shuffle(PRODUCT_CATALOG);

    const selectedProducts = availableProducts
        .slice(0, totalProducts)
        .map(product => ({

            ...product,

            quantity: random(1, 5)

        }));

    return {

        id: `ORD-${Date.now()}`,

        module,

        products: selectedProducts,

        createdAt: new Date()

    };

}

//======================================================
// GENERADOR DE RUTAS
//======================================================

export function generateRoutes(level: HelpLevel): Route[] {

    const routes: Route[] = [];

    // Ruta óptima
    routes.push({
        id: 1,
        distance: 120,
        estimatedTime: 95,
        fuel: 8,
        efficiency: 100
    });

    // Ruta alternativa
    routes.push({
        id: 2,
        distance: 145,
        estimatedTime: 112,
        fuel: 10,
        efficiency: 88
    });

    // Ruta menos eficiente
    routes.push({
        id: 3,
        distance: 175,
        estimatedTime: 140,
        fuel: 13,
        efficiency: 72
    });

    // Subnivel 1 -> solo se muestra la mejor ruta
    if (level === HelpLevel.GUIADO) {
        return [routes[0]];
    }

    // Subnivel 2 -> se muestran las tres para elegir
    if (level === HelpLevel.SUGERENCIA) {
        return routes;
    }

    // Subnivel 3 -> no se muestra ninguna ayuda
    return [];

}

//======================================================
// CREAR MISIÓN
//======================================================

export function createMission(

    module: ModuleType,

    level: HelpLevel,

    totalProducts: number = 5

): Mission {

    const order = generateOrder(module, totalProducts);

    let timeLimit = 300;

    switch (level) {

        case HelpLevel.GUIADO:
            timeLimit = 420;
            break;

        case HelpLevel.SUGERENCIA:
            timeLimit = 360;
            break;

        case HelpLevel.LIBRE:
            timeLimit = 300;
            break;

    }

    return {

        module,

        sublevel: level,

        order,

        routes: generateRoutes(level),

        startTime: Date.now(),

        timeLimit

    };

}
//======================================================
// EVALUACIÓN DE LA MISIÓN
//======================================================

export interface EvaluationData {

    expectedProducts: number;

    processedProducts: number;

    correctProducts: number;

    errors: number;

    totalTime: number;

    fuelUsed: number;

    optimalDistance: number;

    realDistance: number;

}

export function evaluateMission(
    mission: Mission,
    data: EvaluationData
): SessionResult {

    //==================================================
    // EFICIENCIA DE LA RUTA
    //==================================================

    let efficiency = 100;

    if (data.realDistance > data.optimalDistance) {

        efficiency -= Math.round(
            ((data.realDistance - data.optimalDistance) /
            data.optimalDistance) * 100
        );

    }

    if (efficiency < 0) efficiency = 0;

    //==================================================
    // PUNTAJE
    //==================================================

    let score = 0;

    score += data.correctProducts * 100;

    score -= data.errors * 25;

    score += efficiency * 2;

    if (data.totalTime <= mission.timeLimit) {

        score += 100;

    }

    if (score < 0) {

        score = 0;

    }

    //==================================================
    // APROBACIÓN
    //==================================================

    const approved =
        data.correctProducts === data.expectedProducts &&
        data.errors === 0;

    //==================================================
    // RESULTADO
    //==================================================

    return {

        expectedProducts: data.expectedProducts,

        processedProducts: data.processedProducts,

        correctProducts: data.correctProducts,

        errors: data.errors,

        totalTime: data.totalTime,

        fuelUsed: data.fuelUsed,

        efficiency,

        score,

        approved

    };

}

//======================================================
// RESUMEN FINAL
//======================================================

export interface ModuleSummary {

    module: ModuleType;

    sublevel: HelpLevel;

    score: number;

    efficiency: number;

    totalTime: number;

    fuelUsed: number;

    expectedProducts: number;

    processedProducts: number;

    correctProducts: number;

    errors: number;

    approved: boolean;

    nextSublevelUnlocked: boolean;

}

export function createSummary(

    mission: Mission,

    result: SessionResult

): ModuleSummary {

    return {

        module: mission.module,

        sublevel: mission.sublevel,

        score: result.score,

        efficiency: result.efficiency,

        totalTime: result.totalTime,

        fuelUsed: result.fuelUsed,

        expectedProducts: result.expectedProducts,

        processedProducts: result.processedProducts,

        correctProducts: result.correctProducts,

        errors: result.errors,

        approved: result.approved,

        nextSublevelUnlocked: result.approved

    };

}

//======================================================
// PROGRESO DEL MÓDULO
//======================================================

export interface ModuleProgress {

    module: ModuleType;

    currentSublevel: HelpLevel;

    completed: boolean;

    summaries: ModuleSummary[];

}

export function finishSublevel(

    progress: ModuleProgress,

    summary: ModuleSummary

): ModuleProgress {

    const summaries = [...progress.summaries, summary];

    let nextLevel = progress.currentSublevel;

    let completed = false;

    if (summary.approved) {

        if (progress.currentSublevel === HelpLevel.GUIADO) {

            nextLevel = HelpLevel.SUGERENCIA;

        }

        else if (progress.currentSublevel === HelpLevel.SUGERENCIA) {

            nextLevel = HelpLevel.LIBRE;

        }

        else {

            completed = true;

        }

    }

    return {

        module: progress.module,

        currentSublevel: nextLevel,

        completed,

        summaries

    };

}

//======================================================
// INICIAR MÓDULO
//======================================================

export function startModule(

    module: ModuleType,

    sublevel: HelpLevel,

    totalProducts: number = 5

) {

    return createMission(

        module,

        sublevel,

        totalProducts

    );

}

//======================================================
// REGISTRAR PRODUCTO PROCESADO
//======================================================
export function registerProcessedProduct(
  mission: Mission,
  current: number
): number {

  const next = current + 1;

  if (next > mission.order.products.length) {
    return mission.order.products.length;
  }

  return next;
}
//======================================================
// PROGRESO DE MISIÓN EN TIEMPO REAL (PALLETS)
//======================================================

export interface MissionProgress {

    mission: Mission;

    processedProducts: number;

    correctProducts: number;

    errors: number;

    pickedPallets: Map<string, string>;

    completed: boolean;

}

export type DropDestination = "DESPACHO" | "RACK" | "CAMION";

export function createMissionProgress(mission: Mission): MissionProgress {

    return {

        mission,

        processedProducts: 0,

        correctProducts: 0,

        errors: 0,

        pickedPallets: new Map<string, string>(),

        completed: false

    };

}

/**
 * Se llama cuando el montacargas recoge un pallet de un rack.
 * Asigna un SKU del pedido activo a ese pallet.
 */
export function registerPalletPickup(

    progress: MissionProgress,

    palletKey: string

): MissionProgress {

    const products = progress.mission.order.products;

    if (products.length === 0) {
        return progress;
    }

    const randomProduct =
        products[Math.floor(Math.random() * products.length)];

    const pickedPallets = new Map(progress.pickedPallets);

    pickedPallets.set(palletKey, randomProduct.sku);

    return {

        ...progress,

        pickedPallets

    };

}

/**
 * Se llama cuando el montacargas deja un pallet (despacho, rack o camión).
 * Actualiza el progreso del pedido según el destino.
 */
export function registerPalletDropoff(

    progress: MissionProgress,

    palletKey: string,

    destination: DropDestination

): MissionProgress {

    const sku = progress.pickedPallets.get(palletKey);

    let processedProducts = progress.processedProducts;

    let correctProducts = progress.correctProducts;

    let errors = progress.errors;

    if (destination === "DESPACHO") {

        processedProducts = registerProcessedProduct(
            progress.mission,
            processedProducts
        );

        const expectedSkus = progress.mission.order.products.map(p => p.sku);

        if (sku && expectedSkus.includes(sku)) {

            correctProducts += 1;

        } else {

            errors += 1;

        }

    }

    const pickedPallets = new Map(progress.pickedPallets);

    pickedPallets.delete(palletKey);

    const completed =
        processedProducts >= progress.mission.order.products.length;

    return {

        ...progress,

        processedProducts,

        correctProducts,

        errors,

        pickedPallets,

        completed

    };

}

//======================================================
// SKUs PENDIENTES (sincronización con la UI)
//======================================================

export function getPendingSkuLines(

    mission: Mission,

    progress: MissionProgress

): string[] {

    return mission.order.products

        .slice(progress.processedProducts)

        .map(p => `${p.sku} - ${p.name} x${p.quantity}`);

}