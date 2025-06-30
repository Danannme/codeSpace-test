// components
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// icons
import { Phone, Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6">
            <Card className="w-full rounded px-10 md:px-15 py-10 flex-1">
                <div className="space-y-4">
                    <div className="w-fit bg-[#007AFF] p-3 rounded-full">
                        <Phone size={25} color="white" />
                    </div>
                    <p>We are available 24/7, 7 days a week.</p>
                    <p>Phone: (555) 555-1234 </p>
                </div>
                <Separator orientation="horizontal" className="border-2" />
                <div className="space-y-4 ">
                    <div className="w-fit bg-[#007AFF] p-3 rounded-full">
                        <Mail size={25} color="white" />
                    </div>
                    <p>
                        Fill out our form and we will contact you within 24
                        hours.
                    </p>
                    <p>Emails: customer@exclusive.com</p>
                    <p>Emails: support@exclusive.com</p>
                </div>
            </Card>
            <Card className="w-full flex px-10 md:px-15 py-10 gap-4 rounded flex-2">
                <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                    <Input
                        type="text"
                        placeholder="Your Name"
                        className="bg-[#F5F5F5] rounded py-4 w-full flex-1"
                    />
                    <Input
                        type="email"
                        placeholder="Your Email"
                        className="bg-[#F5F5F5] rounded py-4 w-full flex-1"
                    />
                    <Input
                        type="text"
                        placeholder="Your Phone"
                        className="bg-[#F5F5F5] rounded py-4 w-full flex-1"
                    />
                </div>
                <Textarea
                    placeholder="Your Message"
                    className="bg-[#F5F5F5] rounded h-full min-h-[10rem]"
                />
                <Button className="bg-[#007AFF] hover:bg-blue-600 self-end col-span-full py-6">
                    Send Message
                </Button>
            </Card>
        </div>
    );
}
