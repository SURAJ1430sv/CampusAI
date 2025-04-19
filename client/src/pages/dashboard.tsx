import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { Redirect } from "wouter";
import { Calendar, GraduationCap, BookOpen, Bell, FileText, Clock, Buildings, Users } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import ChatModal from "@/components/chat/chat-modal";
import { useState } from "react";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateChat } = useChat();
  
  const handleStartChat = () => {
    initiateChat();
    setIsModalOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(currentDate);
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.username}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
        <Button 
          onClick={handleStartChat}
          className="mt-4 md:mt-0 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
        >
          <Bell className="mr-2 h-4 w-4" /> Ask CampusAI
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Currently enrolled courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Events this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Standing</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">Current semester GPA: 3.7</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Research Paper Draft</p>
                    <p className="text-sm text-muted-foreground">Computer Science 301</p>
                  </div>
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                    Due in 2 days
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Group Project Presentation</p>
                    <p className="text-sm text-muted-foreground">Business Management 204</p>
                  </div>
                  <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Due tomorrow
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Mid-term Quiz</p>
                    <p className="text-sm text-muted-foreground">Mathematics 102</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Due in 5 days
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Assignments</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest updates from your courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 border-b pb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Class Canceled - April 22</p>
                    <p className="text-sm text-muted-foreground">Computer Science 301 - Dr. Smith</p>
                    <p className="text-xs text-muted-foreground mt-1">Posted 2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-4 border-b pb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Extra Credit Opportunity</p>
                    <p className="text-sm text-muted-foreground">Mathematics 102 - Prof. Johnson</p>
                    <p className="text-xs text-muted-foreground mt-1">Posted yesterday</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Revised Syllabus Available</p>
                    <p className="text-sm text-muted-foreground">Business Management 204 - Dr. Chen</p>
                    <p className="text-xs text-muted-foreground mt-1">Posted 3 days ago</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Announcements</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your class schedule for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <DaySchedule 
                  day="Monday" 
                  classes={[
                    { name: "Mathematics 102", time: "9:00 - 10:30 AM", room: "Hall B-101" },
                    { name: "Computer Science 301", time: "2:00 - 3:30 PM", room: "Tech Building 204" }
                  ]} 
                />
                <DaySchedule 
                  day="Tuesday" 
                  classes={[
                    { name: "Business Management 204", time: "11:00 AM - 12:30 PM", room: "Business Center 305" }
                  ]} 
                />
                <DaySchedule 
                  day="Wednesday" 
                  classes={[
                    { name: "Mathematics 102", time: "9:00 - 10:30 AM", room: "Hall B-101" },
                    { name: "Physics Lab", time: "3:00 - 5:00 PM", room: "Science Wing 110" }
                  ]} 
                />
                <DaySchedule 
                  day="Thursday" 
                  classes={[
                    { name: "Business Management 204", time: "11:00 AM - 12:30 PM", room: "Business Center 305" },
                    { name: "Computer Science 301", time: "2:00 - 3:30 PM", room: "Tech Building 204" }
                  ]} 
                />
                <DaySchedule 
                  day="Friday" 
                  classes={[
                    { name: "Study Group", time: "10:00 - 11:30 AM", room: "Library Room 3" }
                  ]} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Computer Science 301</CardTitle>
                <CardDescription>Advanced Programming Concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span>Dr. Alan Smith</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span>Mon/Thu 2:00 - 3:30 PM</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span>Tech Building 204</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current Grade:</span>
                  <span className="font-medium">A-</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <div className="text-xs text-right mt-1 text-muted-foreground">70% completed</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Syllabus</Button>
                <Button variant="secondary" size="sm">Course Materials</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Mathematics 102</CardTitle>
                <CardDescription>Calculus and Analytical Geometry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span>Prof. Sarah Johnson</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span>Mon/Wed 9:00 - 10:30 AM</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span>Hall B-101</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current Grade:</span>
                  <span className="font-medium">B+</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-xs text-right mt-1 text-muted-foreground">60% completed</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Syllabus</Button>
                <Button variant="secondary" size="sm">Course Materials</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Business Management 204</CardTitle>
                <CardDescription>Organizational Behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span>Dr. Michelle Chen</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span>Tue/Thu 11:00 AM - 12:30 PM</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span>Business Center 305</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current Grade:</span>
                  <span className="font-medium">A</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="text-xs text-right mt-1 text-muted-foreground">75% completed</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Syllabus</Button>
                <Button variant="secondary" size="sm">Course Materials</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Physics 201</CardTitle>
                <CardDescription>Mechanics and Thermodynamics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span>Prof. David Garcia</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span>Wed 3:00 - 5:00 PM (Lab)</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Location:</span>
                  <span>Science Wing 110</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current Grade:</span>
                  <span className="font-medium">B</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="text-xs text-right mt-1 text-muted-foreground">65% completed</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">View Syllabus</Button>
                <Button variant="secondary" size="sm">Course Materials</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>April 2025</CardTitle>
              <CardDescription>Your academic and event calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                <div className="text-muted-foreground text-sm font-medium">Sun</div>
                <div className="text-muted-foreground text-sm font-medium">Mon</div>
                <div className="text-muted-foreground text-sm font-medium">Tue</div>
                <div className="text-muted-foreground text-sm font-medium">Wed</div>
                <div className="text-muted-foreground text-sm font-medium">Thu</div>
                <div className="text-muted-foreground text-sm font-medium">Fri</div>
                <div className="text-muted-foreground text-sm font-medium">Sat</div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center">
                {/* Week 1 */}
                <CalendarDay day={null} />
                <CalendarDay day={1} events={[]} />
                <CalendarDay day={2} events={[]} />
                <CalendarDay day={3} events={[]} />
                <CalendarDay day={4} events={[]} />
                <CalendarDay day={5} events={[]} />
                <CalendarDay day={6} events={[]} />
                
                {/* Week 2 */}
                <CalendarDay day={7} events={[]} />
                <CalendarDay day={8} events={[]} />
                <CalendarDay day={9} events={[]} />
                <CalendarDay day={10} events={[]} />
                <CalendarDay day={11} events={[]} />
                <CalendarDay day={12} events={[]} />
                <CalendarDay day={13} events={[]} />
                
                {/* Week 3 */}
                <CalendarDay day={14} events={[]} />
                <CalendarDay day={15} events={[]} />
                <CalendarDay day={16} events={[]} />
                <CalendarDay day={17} events={[]} />
                <CalendarDay day={18} events={[]} />
                <CalendarDay day={19} events={['Research Paper Due']} />
                <CalendarDay day={20} events={[]} />
                
                {/* Week 4 */}
                <CalendarDay day={21} events={[]} />
                <CalendarDay day={22} events={['Class Canceled']} />
                <CalendarDay day={23} events={[]} />
                <CalendarDay day={24} events={['Mid-term Quiz']} />
                <CalendarDay day={25} events={['Group Presentation']} highlighted />
                <CalendarDay day={26} events={[]} />
                <CalendarDay day={27} events={[]} />
                
                {/* Week 5 */}
                <CalendarDay day={28} events={[]} />
                <CalendarDay day={29} events={[]} />
                <CalendarDay day={30} events={['Career Fair']} />
                <CalendarDay day={null} />
                <CalendarDay day={null} />
                <CalendarDay day={null} />
                <CalendarDay day={null} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous Month</Button>
              <Button variant="outline">Next Month</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <ResourceCard 
              title="Academic Advising" 
              description="Connect with your academic advisor for course planning and career guidance."
              icon={<GraduationCap className="h-6 w-6" />}
              buttonText="Schedule Appointment"
            />
            <ResourceCard 
              title="Library Services" 
              description="Access online journals, research databases, and reserve study rooms."
              icon={<BookOpen className="h-6 w-6" />}
              buttonText="Access Library"
            />
            <ResourceCard 
              title="Learning Center" 
              description="Get tutoring assistance, writing help, and study skills workshops."
              icon={<Users className="h-6 w-6" />}
              buttonText="Book Tutoring"
            />
            <ResourceCard 
              title="Campus Facilities" 
              description="Information about computer labs, recreation center, and dining options."
              icon={<Buildings className="h-6 w-6" />}
              buttonText="View Facilities"
            />
            <ResourceCard 
              title="Career Services" 
              description="Resume reviews, job listings, internships, and career fairs."
              icon={<FileText className="h-6 w-6" />}
              buttonText="Explore Careers"
            />
            <ResourceCard 
              title="Office Hours" 
              description="Schedule and times when professors are available for consultation."
              icon={<Clock className="h-6 w-6" />}
              buttonText="View Schedule"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      {isModalOpen && <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

interface DayScheduleProps {
  day: string;
  classes: {
    name: string;
    time: string;
    room: string;
  }[];
}

function DaySchedule({ day, classes }: DayScheduleProps) {
  return (
    <div className="border rounded-lg p-3">
      <h3 className="font-medium text-sm mb-2">{day}</h3>
      {classes.length > 0 ? (
        <div className="space-y-2">
          {classes.map((cls, index) => (
            <div key={index} className="bg-muted rounded-md p-2 text-xs">
              <div className="font-medium">{cls.name}</div>
              <div className="text-muted-foreground mt-1">{cls.time}</div>
              <div className="text-muted-foreground">{cls.room}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground text-xs p-2">No classes</div>
      )}
    </div>
  );
}

interface CalendarDayProps {
  day: number | null;
  events?: string[];
  highlighted?: boolean;
}

function CalendarDay({ day, events = [], highlighted = false }: CalendarDayProps) {
  if (day === null) {
    return <div className="h-20 border rounded-md bg-muted/20"></div>;
  }
  
  return (
    <div className={`h-20 border rounded-md p-1 overflow-hidden ${highlighted ? 'bg-primary/10 border-primary/30' : ''}`}>
      <div className="text-right text-sm mb-1">{day}</div>
      <div className="space-y-1">
        {events.map((event, index) => (
          <div key={index} className="text-xs bg-primary/10 text-primary rounded-sm px-1 py-0.5 truncate">
            {event}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
}

function ResourceCard({ title, description, icon, buttonText }: ResourceCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}