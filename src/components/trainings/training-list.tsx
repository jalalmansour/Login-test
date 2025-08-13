"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trainings } from "@/lib/mock-data"
import { Clock, Tag, DollarSign, PlusCircle } from "lucide-react"

export function TrainingList() {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredTrainings = trainings.filter(training => 
        training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.competencies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <Input 
                        placeholder="Search trainings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Training
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTrainings.map(training => (
                    <Card key={training.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{training.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{training.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Tag className="mr-2 h-4 w-4" />
                                <span>{training.category}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{training.durationHours} hours</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>{training.costPerParticipant} / person</span>
                            </div>
                             <div className="flex flex-wrap gap-2 pt-2">
                                {training.competencies.map(comp => (
                                    <Badge key={comp} variant="secondary">{comp}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">View Sessions</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
