"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import Link from "next/link"

// Computer specs data
const specs = {
    desktop: {
        cpu: "AMD Ryzen 7 7800X3D",
        gpu: "Gigabyte AORUS RTX 5080 Xtreme Waterforce 16GB GDDR7",
        ram: "Corsair Vengeance RGB 64GB (2×32GB) DDR5-6000 CL30",
        storage: "Samsung 990 PRO 2TB NVMe Gen4 SSD",
        motherboard: "ASUS TUF Gaming X670E-Plus WiFi (AM5)",
        cooling: "DeepCool LS720S Zero Dark 360mm AIO",
        psu: "Corsair RM850x SHIFT 850W Gold Modular",
        case: "Lian Li O11 Dynamic EVO (Black)",
        monitors: [
            {
                name: "MSI MEG 342C UWQHD 175Hz OLED Curved 34in Monitor",
                resolution: "3440 x 1440",
                refreshRate: "175Hz",
                panelType: "OLED",
                responseTime: "0.03ms",
            },
            {
                name: 'Samsung Odyssey Curved G5 34" Ultrawide QHD 165Hz FreeSync HDR10 (21:9)',
                resolution: "3440 x 1440",
                refreshRate: "165Hz",
                panelType: "VA",
                responseTime: "1ms",
            },
        ],
    },
    laptop: {
        model: "Apple MacBook Pro M4",
        cpu: "Apple M4 Chip (8-core CPU, 10-core GPU, 16-core Neural Engine)",
        gpu: "Integrated Apple M4 GPU (10-core)",
        ram: "16GB Unified Memory",
        storage: "512GB SSD",
        display: '14" Liquid Retina XDR Display with Nano-Texture Glass (3024 x 1964 pixels, 120Hz ProMotion)',
        battery: "70Wh Lithium-Polymer",
        batteryLife: "Up to 18 hours",
        weight: "1.55 kg (3.4 lbs)",
    },
    accessories: {
        mouse: "Glorious Model O",
        mouseSpecs: "67g Ultra-lightweight, 12,000 DPI, RGB",
        keyboard: "Ducky One 2 Mini with Custom Switches",
        keyboardSpecs: "60% Layout, Cherry MX Brown Switches, PBT Keycaps",
        headphones: "PS5 Black Edition Headset",
        headphonesSpecs: "3D Audio, Noise-cancelling Microphone, 12-hour Battery",
        controller: "PS5 DualSense Controller",
        controllerSpecs: "Haptic Feedback, Adaptive Triggers, Motion Controls",
    },
    micSetup: {
        microphone: "FIFINE XLR Dynamic Microphone",
        microphoneSpecs: "Cardioid Polar Pattern, 50Hz-16kHz Frequency Response",
        audioInterface: "FIFINE Gaming Audio Mixer",
        audioInterfaceSpecs: "USB Connection, 48kHz/24-bit, RGB Lighting",
        micArm: "FIFINE Microphone Arm",
        micArmSpecs: "360° Rotation, Desk Clamp Mount, Cable Management",
        popFilter: "FIFINE Pop Filter (Included)",
        popFilterSpecs: "Double-layer Mesh, Flexible Gooseneck",
    },
    homeServer: {
        cpu: "AMD Ryzen 9 5950X 16-Core 4.9GHz",
        cpuCores: "16 Cores, 32 Threads",
        ram: "Corsair Vengeance LPX 128GB (4x32GB) DDR4 3200MHz CL16",
        storage: 'Samsung SSD 870 Evo 1TB SATA 2.5"',
        motherboard: "ASUS TUF Gaming X570-PLUS ATX (PCIe 4.0)",
        cooling: "NZXT Kraken Liquid Cooler",
        psu: "Corsair RM750x SHIFT 750W 80+ Gold Modular",
        network: "ASUS V2 10Gbps Base-T PCIe Network Adapter",
        case: "6 GPU Mining Rig Open Air Steel Frame",
    },
}

// Spec item component
interface SpecItemProps {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
}

const SpecItem = ({ icon: Icon, label, value }: SpecItemProps) => {
    return (
        <motion.div
            className="p-4 bg-black/60 border border-purple-900/30 rounded-lg hover:border-purple-500/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-purple-900/30">
                    <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="font-medium text-purple-200">{label}</h3>
            </div>
            <p className="text-purple-200/80">{value}</p>
        </motion.div>
    )
}

// Monitor component
interface MonitorDisplayProps {
    monitor: {
        name: string
        resolution: string
        refreshRate: string
        panelType: string
        responseTime: string
    }
}

const MonitorDisplay = ({ monitor }: MonitorDisplayProps) => {
    return (
        <motion.div
            className="p-4 bg-black/60 border border-purple-900/30 rounded-lg hover:border-purple-500/50 transition-all"
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-purple-900/30">
                    <Monitor className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="font-medium text-purple-200">Display</h3>
            </div>
            <p className="text-purple-200/80 mb-4">{monitor.name}</p>
            <div className="grid grid-cols-2 gap-2">
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
                    Welcome to my tech command center. Here you&#39;ll find detailed specifications of all my hardware setups, from my
                    main desktop rig to peripherals and server equipment.
                </motion.p>

                <Tabs defaultValue="desktop" className="space-y-8">
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
                            <SpecItem icon={Cpu} label="Processor" value={specs.desktop.cpu} />
                            <SpecItem icon={Gpu} label="Graphics" value={specs.desktop.gpu} />
                            <SpecItem icon={Memory} label="Memory" value={specs.desktop.ram} />
                            <SpecItem icon={HardDrive} label="Storage" value={specs.desktop.storage} />
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

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Additional Components</h2>
                                <div className="grid gap-4 md:grid-cols-2 relative z-10">
                                    <div>
                                        <h3 className="font-medium text-purple-200">Motherboard</h3>
                                        <p className="text-purple-200/70">{specs.desktop.motherboard}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Cooling</h3>
                                        <p className="text-purple-200/70">{specs.desktop.cooling}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Power Supply</h3>
                                        <p className="text-purple-200/70">{specs.desktop.psu}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Case</h3>
                                        <p className="text-purple-200/70">{specs.desktop.case}</p>
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
                            <SpecItem icon={Laptop} label="Model" value={specs.laptop.model} />
                            <SpecItem icon={Cpu} label="Processor" value={specs.laptop.cpu} />
                            <SpecItem icon={Memory} label="Memory" value={specs.laptop.ram} />
                            <SpecItem icon={HardDrive} label="Storage" value={specs.laptop.storage} />
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
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Battery</h2>
                                <p className="text-purple-200/80 mb-2 relative z-10">{specs.laptop.battery}</p>
                                <p className="text-purple-200/80 mb-4 relative z-10">Battery Life: {specs.laptop.batteryLife}</p>
                                <p className="text-purple-200/80 relative z-10">Weight: {specs.laptop.weight}</p>
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
                            <SpecItem icon={Mouse} label="Mouse" value={specs.accessories.mouse} />
                            <SpecItem icon={Keyboard} label="Keyboard" value={specs.accessories.keyboard} />
                            <SpecItem icon={Headphones} label="Headphones" value={specs.accessories.headphones} />
                            <SpecItem icon={Gamepad} label="Controller" value={specs.accessories.controller} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Specifications</h2>
                                <div className="grid gap-4 md:grid-cols-2 relative z-10">
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
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="mic" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem icon={Mic} label="Microphone" value={specs.micSetup.microphone} />
                            <SpecItem icon={Cpu} label="Audio Interface" value={specs.micSetup.audioInterface} />
                            <SpecItem icon={Laptop} label="Mic Arm" value={specs.micSetup.micArm} />
                            <SpecItem icon={HardDrive} label="Pop Filter" value={specs.micSetup.popFilter} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Specifications</h2>
                                <div className="grid gap-4 md:grid-cols-2 relative z-10">
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
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="homeServer" className="space-y-8">
                        <motion.div
                            className="grid gap-6 md:grid-cols-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <SpecItem icon={Cpu} label="Processor" value={specs.homeServer.cpu} />
                            <SpecItem icon={Memory} label="Memory" value={specs.homeServer.ram} />
                            <SpecItem icon={HardDrive} label="Storage" value={specs.homeServer.storage} />
                            <SpecItem icon={Server} label="Network" value={specs.homeServer.network} />
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
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Cooling</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.cooling}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Power Supply</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.psu}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-purple-200">Case</h3>
                                        <p className="text-purple-200/70">{specs.homeServer.case}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-black/60 border border-purple-900/30 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 relative z-10">Server Capabilities</h2>
                                <div className="grid gap-4 md:grid-cols-2 relative z-10">
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

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-purple-200 mb-4">System Status</h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                            Online
                        </Badge>
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Optimal Performance
                        </Badge>
                        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            Updates Available
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
