"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import {
    ChevronLeft,
    Cpu,
    MemoryStickIcon as Memory,
    HardDrive,
    CpuIcon as Gpu,
    Monitor,
    Laptop,
    Headphones,
    Mic,
    Mouse,
    Keyboard,
    Gamepad,
    Server,
    Star,
    Activity,
    Thermometer,
    Zap,
    Clock,
    Gauge,
    BarChart3,
    Wifi,
    Shield,
} from "lucide-react"
import Link from "next/link"

// Mock data for computer specs
const specs = {
    desktop: {
        cpu: "AMD Ryzen 7 7800X3D",
        cpuRating: 95,
        cpuTemp: 65,
        cpuClock: "4.2 GHz (5.0 GHz Boost)",
        cpuCores: "8 Cores, 16 Threads",
        gpu: "Gigabyte AORUS RTX 5080 Xtreme Waterforce 16GB GDDR7",
        gpuRating: 98,
        gpuTemp: 68,
        gpuClock: "2.5 GHz (2.8 GHz Boost)",
        gpuMemory: "16GB GDDR7",
        ram: "Corsair Vengeance RGB 64GB (2×32GB) DDR5-6000 CL30",
        ramRating: 92,
        ramSpeed: "6000 MHz",
        ramLatency: "CL30",
        storage: "Samsung 990 PRO 2TB NVMe Gen4 SSD",
        storageRating: 94,
        storageSpeed: "7,000 MB/s Read, 5,100 MB/s Write",
        storageType: "NVMe PCIe 4.0 x4",
        motherboard: "ASUS TUF Gaming X670E-Plus WiFi (AM5)",
        motherboardRating: 88,
        cooling: "DeepCool LS720S Zero Dark 360mm AIO",
        coolingRating: 90,
        psu: "Corsair RM850x SHIFT 850W Gold Modular",
        psuRating: 92,
        case: "Lian Li O11 Dynamic EVO (Black)",
        caseRating: 95,
        monitors: [
            {
                name: "MSI MEG 342C UWQHD 175Hz OLED Curved 34in Monitor",
                rating: 96,
                resolution: "3440 x 1440",
                refreshRate: "175Hz",
                panelType: "OLED",
                responseTime: "0.03ms",
            },
            {
                name: 'Samsung Odyssey Curved G5 34" Ultrawide QHD 165Hz FreeSync HDR10 (21:9)',
                rating: 90,
                resolution: "3440 x 1440",
                refreshRate: "165Hz",
                panelType: "VA",
                responseTime: "1ms",
            },
        ],
        benchmarks: {
            gaming: 96,
            productivity: 94,
            content: 92,
        },
    },
    laptop: {
        model: "Apple MacBook Pro M4",
        modelRating: 95,
        cpu: "Apple M4 Chip (8-core CPU, 10-core GPU, 16-core Neural Engine)",
        cpuRating: 94,
        gpu: "Integrated Apple M4 GPU (10-core)",
        gpuRating: 88,
        ram: "16GB Unified Memory",
        ramRating: 90,
        storage: "512GB SSD",
        storageRating: 92,
        display: '14" Liquid Retina XDR Display with Nano-Texture Glass (3024 x 1964 pixels, 120Hz ProMotion)',
        displayRating: 96,
        battery: "70Wh Lithium-Polymer",
        batteryRating: 94,
        batteryLife: "Up to 18 hours",
        weight: "1.55 kg (3.4 lbs)",
        benchmarks: {
            productivity: 95,
            battery: 96,
            portability: 92,
        },
    },
    accessories: {
        mouse: "Glorious Model O",
        mouseRating: 92,
        mouseSpecs: "67g Ultra-lightweight, 12,000 DPI, RGB",
        keyboard: "Ducky One 2 Mini with Custom Switches",
        keyboardRating: 94,
        keyboardSpecs: "60% Layout, Cherry MX Brown Switches, PBT Keycaps",
        headphones: "PS5 Black Edition Headset",
        headphonesRating: 88,
        headphonesSpecs: "3D Audio, Noise-cancelling Microphone, 12-hour Battery",
        controller: "PS5 DualSense Controller",
        controllerRating: 95,
        controllerSpecs: "Haptic Feedback, Adaptive Triggers, Motion Controls",
        benchmarks: {
            gaming: 93,
            comfort: 90,
            durability: 88,
        },
    },
    micSetup: {
        microphone: "FIFINE XLR Dynamic Microphone",
        microphoneRating: 86,
        microphoneSpecs: "Cardioid Polar Pattern, 50Hz-16kHz Frequency Response",
        audioInterface: "FIFINE Gaming Audio Mixer",
        audioInterfaceRating: 84,
        audioInterfaceSpecs: "USB Connection, 48kHz/24-bit, RGB Lighting",
        micArm: "FIFINE Microphone Arm",
        micArmRating: 82,
        micArmSpecs: "360° Rotation, Desk Clamp Mount, Cable Management",
        popFilter: "FIFINE Pop Filter (Included)",
        popFilterRating: 80,
        popFilterSpecs: "Double-layer Mesh, Flexible Gooseneck",
        benchmarks: {
            audioQuality: 85,
            convenience: 88,
            value: 92,
        },
    },
    homeServer: {
        cpu: "AMD Ryzen 9 5950X 16-Core 4.9GHz",
        cpuRating: 96,
        cpuCores: "16 Cores, 32 Threads",
        ram: "Corsair Vengeance LPX 128GB (4x32GB) DDR4 3200MHz CL16",
        ramRating: 94,
        storage: 'Samsung SSD 870 Evo 1TB SATA 2.5"',
        storageRating: 88,
        motherboard: "ASUS TUF Gaming X570-PLUS ATX (PCIe 4.0)",
        motherboardRating: 90,
        cooling: "NZXT Kraken Liquid Cooler",
        coolingRating: 92,
        psu: "Corsair RM750x SHIFT 750W 80+ Gold Modular",
        psuRating: 90,
        network: "ASUS V2 10Gbps Base-T PCIe Network Adapter",
        networkRating: 95,
        case: "6 GPU Mining Rig Open Air Steel Frame",
        caseRating: 85,
        benchmarks: {
            server: 94,
            mining: 90,
            reliability: 92,
        },
    },
}

// System status data
const systemStatus = {
    cpuUsage: 32,
    gpuUsage: 28,
    ramUsage: 45,
    storageUsage: 68,
    networkSpeed: "945 Mbps",
    temperature: 62,
    uptime: "43 days, 7 hours",
    processes: 142,
    updates: 3,
}

// Performance rating component
const PerformanceRating = ({ rating }) => {
    const stars = []
    const fullStars = Math.floor(rating / 20)
    const hasHalfStar = rating % 20 >= 10

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} className="h-4 w-4 fill-purple-400 text-purple-400" />)
        } else if (i === fullStars && hasHalfStar) {
            stars.push(
                <div key={i} className="relative">
                    <Star className="h-4 w-4 text-purple-400/30" />
                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                        <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
                    </div>
                </div>,
            )
        } else {
            stars.push(<Star key={i} className="h-4 w-4 text-purple-400/30" />)
        }
    }

    return (
        <div className="flex items-center gap-1">
            {stars}
            <span className="ml-2 text-sm font-medium text-purple-300">{rating}/100</span>
        </div>
    )
}

// Performance meter component
const PerformanceMeter = ({ value, label, icon: Icon, colorClass = "from-purple-500 to-pink-600" }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-200">{label}</span>
                </div>
                <span className="text-sm font-medium text-purple-300">{value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-black/50 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${colorClass}`} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}

// Benchmark component
const BenchmarkDisplay = ({ benchmarks }) => {
    return (
        <div className="grid gap-4">
            {Object.entries(benchmarks).map(([key, value]) => (
                <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span className="text-sm capitalize text-purple-200">{key}</span>
                        <span className="text-sm font-medium text-purple-300">{value}/100</span>
                    </div>
                    <Progress
                        value={value}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-600"
                    />
                </div>
            ))}
        </div>
    )
}

// Spec item component
const SpecItem = ({ icon: Icon, label, value, rating }) => {
    return (
        <motion.div
            className="p-4 bg-black/60 border border-purple-900/30 rounded-lg hover:border-purple-500/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-purple-900/30">
                        <Icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium text-purple-200">{label}</h3>
                </div>
                {rating && <PerformanceRating rating={rating} />}
            </div>
            <p className="text-purple-200/80 mt-2">{value}</p>
        </motion.div>
    )
}

// Monitor component
const MonitorDisplay = ({ monitor }) => {
    return (
        <motion.div
            className="p-4 bg-black/60 border border-purple-900/30 rounded-lg hover:border-purple-500/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-full bg-purple-900/30">
                        <Monitor className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium text-purple-200">Display</h3>
                </div>
                <PerformanceRating rating={monitor.rating} />
            </div>
            <p className="text-purple-200/80 mt-2">{monitor.name}</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="text-xs text-purple-300/70">
                    <span className="block text-purple-400">Resolution</span>
                    {monitor.resolution}
                </div>
                <div className="text-xs text-purple-300/70">
                    <span className="block text-purple-400">Refresh Rate</span>
                    {monitor.refreshRate}
                </div>
                <div className="text-xs text-purple-300/70">
                    <span className="block text-purple-400">Panel Type</span>
                    {monitor.panelType}
                </div>
                <div className="text-xs text-purple-300/70">
                    <span className="block text-purple-400">Response Time</span>
                    {monitor.responseTime}
                </div>
            </div>
        </motion.div>
    )
}

// System status component
const SystemStatusDisplay = () => {
    const [status, setStatus] = useState(systemStatus)

    // Simulate changing system status
    useEffect(() => {
        const interval = setInterval(() => {
            setStatus((prev) => ({
                ...prev,
                cpuUsage: Math.floor(Math.random() * 30) + 20,
                gpuUsage: Math.floor(Math.random() * 25) + 15,
                ramUsage: Math.floor(Math.random() * 20) + 35,
                temperature: Math.floor(Math.random() * 8) + 58,
            }))
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="p-6 bg-black/60 border border-purple-900/30 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-xl font-semibold text-purple-200 mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-400" />
                System Status
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <PerformanceMeter
                        value={status.cpuUsage}
                        label="CPU Usage"
                        icon={Cpu}
                        colorClass="from-blue-500 to-purple-600"
                    />
                    <PerformanceMeter
                        value={status.gpuUsage}
                        label="GPU Usage"
                        icon={Gpu}
                        colorClass="from-green-500 to-teal-600"
                    />
                    <PerformanceMeter
                        value={status.ramUsage}
                        label="RAM Usage"
                        icon={Memory}
                        colorClass="from-yellow-500 to-orange-600"
                    />
                    <PerformanceMeter
                        value={status.storageUsage}
                        label="Storage Usage"
                        icon={HardDrive}
                        colorClass="from-red-500 to-pink-600"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                            <Thermometer className="h-4 w-4 text-purple-400" />
                            Temperature
                        </div>
                        <div className="text-lg font-medium text-purple-200">
                            {status.temperature}°C
                            <span className={`ml-2 text-xs ${status.temperature > 70 ? "text-red-400" : "text-green-400"}`}>
                {status.temperature > 70 ? "High" : "Normal"}
              </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                            <Wifi className="h-4 w-4 text-purple-400" />
                            Network
                        </div>
                        <div className="text-lg font-medium text-purple-200">{status.networkSpeed}</div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                            <Clock className="h-4 w-4 text-purple-400" />
                            Uptime
                        </div>
                        <div className="text-sm font-medium text-purple-200">{status.uptime}</div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                            <Shield className="h-4 w-4 text-purple-400" />
                            Security
                        </div>
                        <div className="text-sm font-medium text-purple-200">
                            Protected
                            <span className="ml-2 text-xs text-green-400">Active</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                            <BarChart3 className="h-4 w-4 text-purple-400" />
                            Processes
                        </div>
                        <div className="text-lg font-medium text-purple-200">{status.processes}</div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                            <Zap className="h-4 w-4 text-purple-400" />
                            Power
                        </div>
                        <div className="text-sm font-medium text-purple-200">
                            Balanced
                            <span className="ml-2 text-xs text-blue-400">Optimized</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Online
                </Badge>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Optimal Performance
                </Badge>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Updates Available ({status.updates})
                </Badge>
            </div>
        </motion.div>
    )
}

export default function LabPage() {
    return (
        <div className="py-12 relative">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 -right-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative">
                <div className="mb-8 flex items-center gap-2">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-purple-200/50">back to home</span>
                </div>

                <motion.h1
                    className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    The Lab
                </motion.h1>

                <motion.p
                    className="text-purple-200/70 mb-8 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Welcome to my tech command center. Here you'll find detailed specifications of all my hardware setups, from my
                    main desktop rig to peripherals and server equipment.
                </motion.p>

                <SystemStatusDisplay />

                <Tabs defaultValue="desktop" className="mt-12 space-y-8">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-black/50 border border-purple-900/20">
                        <TabsTrigger value="desktop">Desktop</TabsTrigger>
                        <TabsTrigger value="laptop">Laptop</TabsTrigger>
                        <TabsTrigger value="accessories">Accessories</TabsTrigger>
                        <TabsTrigger value="mic">Mic Setup</TabsTrigger>
                        <TabsTrigger value="homeServer">Home Server</TabsTrigger>
                    </TabsList>

                    <TabsContent value="desktop" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem icon={Cpu} label="Processor" value={specs.desktop.cpu} rating={specs.desktop.cpuRating} />
                            <SpecItem icon={Gpu} label="Graphics" value={specs.desktop.gpu} rating={specs.desktop.gpuRating} />
                            <SpecItem icon={Memory} label="Memory" value={specs.desktop.ram} rating={specs.desktop.ramRating} />
                            <SpecItem
                                icon={HardDrive}
                                label="Storage"
                                value={specs.desktop.storage}
                                rating={specs.desktop.storageRating}
                            />
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {specs.desktop.monitors.map((monitor, index) => (
                                <MonitorDisplay key={index} monitor={monitor} />
                            ))}
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Additional Components</h2>
                                <div className="grid gap-4 md:grid-cols-2 relative z-10">
                                    <div>
                                        <h3 className="font-medium text-purple-200">Motherboard</h3>
                                        <p className="text-purple-200/70">{specs.desktop.motherboard}</p>
                                        <PerformanceRating rating={specs.desktop.motherboardRating} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Cooling</h3>
                                        <p className="text-purple-200/70">{specs.desktop.cooling}</p>
                                        <PerformanceRating rating={specs.desktop.coolingRating} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Power Supply</h3>
                                        <p className="text-purple-200/70">{specs.desktop.psu}</p>
                                        <PerformanceRating rating={specs.desktop.psuRating} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Case</h3>
                                        <p className="text-purple-200/70">{specs.desktop.case}</p>
                                        <PerformanceRating rating={specs.desktop.caseRating} />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Performance Benchmarks</h2>
                                <div className="relative z-10">
                                    <BenchmarkDisplay benchmarks={specs.desktop.benchmarks} />

                                    <div className="mt-6 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-purple-400" />
                                            <span className="text-sm font-medium text-purple-200">Overall Rating</span>
                                            <span className="ml-auto text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        94/100
                      </span>
                                        </div>
                                        <div className="mt-2 text-xs text-purple-200/70">
                                            High-end gaming rig with excellent performance for gaming and content creation
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="laptop" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem icon={Laptop} label="Model" value={specs.laptop.model} rating={specs.laptop.modelRating} />
                            <SpecItem icon={Cpu} label="Processor" value={specs.laptop.cpu} rating={specs.laptop.cpuRating} />
                            <SpecItem icon={Memory} label="Memory" value={specs.laptop.ram} rating={specs.laptop.ramRating} />
                            <SpecItem
                                icon={HardDrive}
                                label="Storage"
                                value={specs.laptop.storage}
                                rating={specs.laptop.storageRating}
                            />
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Display</h2>
                                <p className="text-purple-200/80 mb-4 relative z-10">{specs.laptop.display}</p>
                                <PerformanceRating rating={specs.laptop.displayRating} />
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Battery</h2>
                                <p className="text-purple-200/80 mb-2 relative z-10">{specs.laptop.battery}</p>
                                <p className="text-purple-200/80 mb-4 relative z-10">Battery Life: {specs.laptop.batteryLife}</p>
                                <PerformanceRating rating={specs.laptop.batteryRating} />
                            </Card>
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Performance Benchmarks</h2>
                                <div className="relative z-10">
                                    <BenchmarkDisplay benchmarks={specs.laptop.benchmarks} />

                                    <div className="mt-6 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-purple-400" />
                                            <span className="text-sm font-medium text-purple-200">Overall Rating</span>
                                            <span className="ml-auto text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        94/100
                      </span>
                                        </div>
                                        <div className="mt-2 text-xs text-purple-200/70">
                                            Premium laptop with excellent performance, display quality, and battery life
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Portability</h2>
                                <div className="grid gap-4 relative z-10">
                                    <div>
                                        <h3 className="font-medium text-purple-200">Weight</h3>
                                        <p className="text-purple-200/70">{specs.laptop.weight}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Dimensions</h3>
                                        <p className="text-purple-200/70">31.26 x 22.12 x 1.55 cm</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Connectivity</h3>
                                        <p className="text-purple-200/70">Thunderbolt 4, USB-C, MagSafe, HDMI, SD Card</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="accessories" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem
                                icon={Mouse}
                                label="Mouse"
                                value={specs.accessories.mouse}
                                rating={specs.accessories.mouseRating}
                            />
                            <SpecItem
                                icon={Keyboard}
                                label="Keyboard"
                                value={specs.accessories.keyboard}
                                rating={specs.accessories.keyboardRating}
                            />
                            <SpecItem
                                icon={Headphones}
                                label="Headphones"
                                value={specs.accessories.headphones}
                                rating={specs.accessories.headphonesRating}
                            />
                            <SpecItem
                                icon={Gamepad}
                                label="Controller"
                                value={specs.accessories.controller}
                                rating={specs.accessories.controllerRating}
                            />
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Specifications</h2>
                                <div className="grid gap-4 relative z-10">
                                    <div>
                                        <h3 className="font-medium text-purple-200">Mouse</h3>
                                        <p className="text-purple-200/70">{specs.accessories.mouseSpecs}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Keyboard</h3>
                                        <p className="text-purple-200/70">{specs.accessories.keyboardSpecs}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Headphones</h3>
                                        <p className="text-purple-200/70">{specs.accessories.headphonesSpecs}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Controller</h3>
                                        <p className="text-purple-200/70">{specs.accessories.controllerSpecs}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Performance Benchmarks</h2>
                                <div className="relative z-10">
                                    <BenchmarkDisplay benchmarks={specs.accessories.benchmarks} />

                                    <div className="mt-6 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-purple-400" />
                                            <span className="text-sm font-medium text-purple-200">Overall Rating</span>
                                            <span className="ml-auto text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        90/100
                      </span>
                                        </div>
                                        <div className="mt-2 text-xs text-purple-200/70">
                                            High-quality gaming peripherals optimized for competitive gaming
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="mic" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem
                                icon={Mic}
                                label="Microphone"
                                value={specs.micSetup.microphone}
                                rating={specs.micSetup.microphoneRating}
                            />
                            <SpecItem
                                icon={Cpu}
                                label="Audio Interface"
                                value={specs.micSetup.audioInterface}
                                rating={specs.micSetup.audioInterfaceRating}
                            />
                            <SpecItem
                                icon={Laptop}
                                label="Mic Arm"
                                value={specs.micSetup.micArm}
                                rating={specs.micSetup.micArmRating}
                            />
                            <SpecItem
                                icon={Shield}
                                label="Pop Filter"
                                value={specs.micSetup.popFilter}
                                rating={specs.micSetup.popFilterRating}
                            />
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Specifications</h2>
                                <div className="grid gap-4 relative z-10">
                                    <div>
                                        <h3 className="font-medium text-purple-200">Microphone</h3>
                                        <p className="text-purple-200/70">{specs.micSetup.microphoneSpecs}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Audio Interface</h3>
                                        <p className="text-purple-200/70">{specs.micSetup.audioInterfaceSpecs}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Mic Arm</h3>
                                        <p className="text-purple-200/70">{specs.micSetup.micArmSpecs}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Pop Filter</h3>
                                        <p className="text-purple-200/70">{specs.micSetup.popFilterSpecs}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Performance Benchmarks</h2>
                                <div className="relative z-10">
                                    <BenchmarkDisplay benchmarks={specs.micSetup.benchmarks} />

                                    <div className="mt-6 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-purple-400" />
                                            <span className="text-sm font-medium text-purple-200">Overall Rating</span>
                                            <span className="ml-auto text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        85/100
                      </span>
                                        </div>
                                        <div className="mt-2 text-xs text-purple-200/70">
                                            Good quality streaming and recording setup with excellent value
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="homeServer" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem icon={Cpu} label="Processor" value={specs.homeServer.cpu} rating={specs.homeServer.cpuRating} />
                            <SpecItem icon={Memory} label="Memory" value={specs.homeServer.ram} rating={specs.homeServer.ramRating} />
                            <SpecItem
                                icon={HardDrive}
                                label="Storage"
                                value={specs.homeServer.storage}
                                rating={specs.homeServer.storageRating}
                            />
                            <SpecItem
                                icon={Server}
                                label="Network"
                                value={specs.homeServer.network}
                                rating={specs.homeServer.networkRating}
                            />
                        </motion.div>

                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Additional Components</h2>
                                <div className="grid gap-4 md:grid-cols-2 relative z-10">
                                    <div>
                                        <h3 className="font-medium text-purple-200">Motherboard</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.motherboard}</p>
                                        <PerformanceRating rating={specs.homeServer.motherboardRating} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Cooling</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.cooling}</p>
                                        <PerformanceRating rating={specs.homeServer.coolingRating} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Power Supply</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.psu}</p>
                                        <PerformanceRating rating={specs.homeServer.psuRating} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Case</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.case}</p>
                                        <PerformanceRating rating={specs.homeServer.caseRating} />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Performance Benchmarks</h2>
                                <div className="relative z-10">
                                    <BenchmarkDisplay benchmarks={specs.homeServer.benchmarks} />

                                    <div className="mt-6 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
                                        <div className="flex items-center gap-2">
                                            <Gauge className="h-4 w-4 text-purple-400" />
                                            <span className="text-sm font-medium text-purple-200">Overall Rating</span>
                                            <span className="ml-auto text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        92/100
                      </span>
                                        </div>
                                        <div className="mt-2 text-xs text-purple-200/70">
                                            High-performance server setup with excellent multi-tasking capabilities
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            className="grid gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Server Capabilities</h2>
                                <div className="grid gap-4 md:grid-cols-3 relative z-10">
                                    <div className="p-3 bg-black/40 rounded-lg border border-purple-900/30">
                                        <h3 className="font-medium text-purple-300 mb-2">Media Server</h3>
                                        <p className="text-sm text-purple-200/70">Plex Media Server with 4K transcoding capabilities</p>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded-lg border border-purple-900/30">
                                        <h3 className="font-medium text-purple-300 mb-2">Network Storage</h3>
                                        <p className="text-sm text-purple-200/70">NAS functionality with RAID configuration</p>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded-lg border border-purple-900/30">
                                        <h3 className="font-medium text-purple-300 mb-2">Virtual Machines</h3>
                                        <p className="text-sm text-purple-200/70">Multiple VMs for development and testing</p>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded-lg border border-purple-900/30">
                                        <h3 className="font-medium text-purple-300 mb-2">Game Server</h3>
                                        <p className="text-sm text-purple-200/70">Hosting multiple game servers simultaneously</p>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded-lg border border-purple-900/30">
                                        <h3 className="font-medium text-purple-300 mb-2">Web Hosting</h3>
                                        <p className="text-sm text-purple-200/70">Self-hosted websites and applications</p>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded-lg border border-purple-900/30">
                                        <h3 className="font-medium text-purple-300 mb-2">Backup System</h3>
                                        <p className="text-sm text-purple-200/70">Automated backup for all devices</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
