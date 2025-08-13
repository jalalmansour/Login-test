import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { findUserById, findSessionById, findTrainingById, enrollments } from "@/lib/mock-data"

export function RecentEnrollments() {
  const recent = enrollments.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
        <CardDescription>
            The latest employees to enroll in training sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.map(enrollment => {
            const user = findUserById(enrollment.userId);
            const session = findSessionById(enrollment.sessionId);
            const training = session ? findTrainingById(session.trainingId) : null;

            if (!user || !training) return null;
            
            return (
                <div key={enrollment.id} className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={user.avatar} alt="Avatar" />
                    <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Enrolled in {training.title}
                    </p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">
                        {enrollment.status.replace('_', ' ')}
                    </div>
                </div>
            )
        })}
      </CardContent>
    </Card>
  )
}
