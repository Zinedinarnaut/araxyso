import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Cpu, MemoryStickIcon as Memory, HardDrive, CpuIcon as Gpu, Monitor, Laptop, Headphones, Mic, Mouse, Keyboard, Gamepad, Rocket } from 'lucide-react'
import Link from 'next/link'

// Mock data for computer specs
const specs = {
    desktop: {
        cpu: "AMD Ryzen 5 2600 Six Core Processor",
        gpu: "NVIDIA GeForce RTX 3050",
        ram: "Corsair Vengence RGB 4264Mhz (4x8) DDR4",
        storage: "500GB NVMe SSD + 960GB SATA SSD",
        motherboard: "ASUS ROG Crosshair VIII Dark Hero",
        cooling: "Corsair Air Cooler",
        psu: "Gigabyte P750GM 750w modular psu",
        case: "Thermaltake",
        monitors: [
            "LG UltraWide 24\" 60Hz",
            "Samsung Odyssey Curved G5 34\" Ultrawide FreeSync QHD 165hz HDR10 21:9"
        ]
    },
    laptop: {
        model: "HP Victus 16.1",
        cpu: "AMD Ryzen 5 5600H",
        gpu: "NVIDIA GeForce RTX 3050 Dedicated",
        ram: "16GB DDR4 3200Mhz 2x8GB",
        storage: "512 GB PCIe® NVMe™ TLC M.2 SSD",
        display: "16.1\" 1440p 144Hz"
    },
    accessories: {
        mouse: "Glorious Model 0",
        keyboard: "Ducky two Mini with custom made switches",
        headphones: "PS5 Black Edition Headset",
        controller: "PS5 Controller with Duelsense support"
    },
    micSetup: {
        microphone: "FIFINE XLR Dynamic",
        audioInterface: "FIFINE Gaming audio mixer",
        micArm: "FIFINE Microphone Arm",
        popFilter: "Stedman Proscreen XL"
    },
    futurePC: {
        cpu: "AMD Ryzen 7 7800X3D",
        gpu: "Nvidia GeForce RTX 5070",
        ram: "Corsair Dominator Platinum DDR5 32GB (2x16GB) 6000MHz RAM",
        storage: "Samsung 980 Pro 1TB NVMe SSD",
        storage2: "Crucial P3 Plus 2TB NVMe SSD",
        motherboard: "NZXT N7 B650E Motherboard",
        cooling: "NZXT Kraken Elite 360 RGB AIO Cooler",
        psu: "NZXT C850 850W 80+ Gold Modular",
        case: "NZXT H9 Elite Case",
        fans: "NZXT F Series RGB Duo 120mm Fans (Pack of 3)"
    }
}

export default function LabPage() {
    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                The Lab
            </h1>

            <Tabs defaultValue="desktop" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-black/50 border border-purple-900/20">
                    <TabsTrigger value="desktop">Desktop</TabsTrigger>
                    <TabsTrigger value="laptop">Laptop</TabsTrigger>
                    <TabsTrigger value="accessories">Accessories</TabsTrigger>
                    <TabsTrigger value="mic">Mic Setup</TabsTrigger>
                    <TabsTrigger value="future">Future Build</TabsTrigger>
                </TabsList>

                <TabsContent value="desktop" className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Cpu className="h-5 w-5 text-purple-400" />
                                Processor
                            </h2>
                            <p className="text-purple-200/70">{specs.desktop.cpu}</p>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Gpu className="h-5 w-5 text-purple-400" />
                                Graphics
                            </h2>
                            <p className="text-purple-200/70">{specs.desktop.gpu}</p>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Memory className="h-5 w-5 text-purple-400" />
                                Memory
                            </h2>
                            <p className="text-purple-200/70">{specs.desktop.ram}</p>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <HardDrive className="h-5 w-5 text-purple-400" />
                                Storage
                            </h2>
                            <p className="text-purple-200/70">{specs.desktop.storage}</p>
                        </Card>
                    </div>

                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                            <Monitor className="h-5 w-5 text-purple-400" />
                            Displays
                        </h2>
                        <ul className="list-disc list-inside text-purple-200/70">
                            {specs.desktop.monitors.map((monitor, index) => (
                                <li key={index}>{monitor}</li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4">Additional Components</h2>
                        <div className="grid gap-4 md:grid-cols-2">
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
                </TabsContent>

                <TabsContent value="laptop" className="space-y-8">
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                            <Laptop className="h-5 w-5 text-purple-400" />
                            Laptop Specs
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="font-medium text-purple-200">Model</h3>
                                <p className="text-purple-200/70">{specs.laptop.model}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Processor</h3>
                                <p className="text-purple-200/70">{specs.laptop.cpu}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Graphics</h3>
                                <p className="text-purple-200/70">{specs.laptop.gpu}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Memory</h3>
                                <p className="text-purple-200/70">{specs.laptop.ram}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Storage</h3>
                                <p className="text-purple-200/70">{specs.laptop.storage}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Display</h3>
                                <p className="text-purple-200/70">{specs.laptop.display}</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="accessories" className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Mouse className="h-5 w-5 text-purple-400" />
                                Mouse
                            </h2>
                            <p className="text-purple-200/70">{specs.accessories.mouse}</p>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Keyboard className="h-5 w-5 text-purple-400" />
                                Keyboard
                            </h2>
                            <p className="text-purple-200/70">{specs.accessories.keyboard}</p>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Headphones className="h-5 w-5 text-purple-400" />
                                Headphones
                            </h2>
                            <p className="text-purple-200/70">{specs.accessories.headphones}</p>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                                <Gamepad className="h-5 w-5 text-purple-400" />
                                Controller
                            </h2>
                            <p className="text-purple-200/70">{specs.accessories.controller}</p>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="mic" className="space-y-8">
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                            <Mic className="h-5 w-5 text-purple-400" />
                            Mic Setup
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="font-medium text-purple-200">Microphone</h3>
                                <p className="text-purple-200/70">{specs.micSetup.microphone}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Audio Interface</h3>
                                <p className="text-purple-200/70">{specs.micSetup.audioInterface}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Mic Arm</h3>
                                <p className="text-purple-200/70">{specs.micSetup.micArm}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Pop Filter</h3>
                                <p className="text-purple-200/70">{specs.micSetup.popFilter}</p>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="future" className="space-y-8">
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-purple-400" />
                            Future Gaming PC
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="font-medium text-purple-200">Processor</h3>
                                <p className="text-purple-200/70">{specs.futurePC.cpu}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Graphics</h3>
                                <p className="text-purple-200/70">{specs.futurePC.gpu}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Memory</h3>
                                <p className="text-purple-200/70">{specs.futurePC.ram}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Storage</h3>
                                <p className="text-purple-200/70">{specs.futurePC.storage}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Storage</h3>
                                <p className="text-purple-200/70">{specs.futurePC.storage2}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Motherboard</h3>
                                <p className="text-purple-200/70">{specs.futurePC.motherboard}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Cooling</h3>
                                <p className="text-purple-200/70">{specs.futurePC.cooling}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Power Supply</h3>
                                <p className="text-purple-200/70">{specs.futurePC.psu}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Case</h3>
                                <p className="text-purple-200/70">{specs.futurePC.case}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-200">Case</h3>
                                <p className="text-purple-200/70">{specs.futurePC.fans}</p>
                            </div>
                        </div>
                    </Card>
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
    )
}

