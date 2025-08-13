import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { enrollments, findSessionById, findTrainingById, findUserById } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import type { Enrollment } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";

function getBadgeVariant(status: Enrollment['status']) {
  switch (status) {
    case 'APPROVED':
    case 'ATTENDED':
      return 'default';
    case 'PENDING_APPROVAL':
      return 'secondary';
    case 'REJECTED':
      return 'destructive';
    default:
      return 'outline';
  }
}

export default function EnrollmentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Enrollments</CardTitle>
        <CardDescription>An overview of your training session enrollments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Training</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map(enrollment => {
              const session = findSessionById(enrollment.sessionId);
              const training = session ? findTrainingById(session.trainingId) : null;
              const user = findUserById(enrollment.userId);

              if (!session || !training || !user) return null;

              return (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{training.title}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{session.startDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(enrollment.status)}>
                      {enrollment.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
