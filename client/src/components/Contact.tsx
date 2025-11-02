import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Copy, Check } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast";

// Vite exposes env vars on import.meta.env. They may be undefined at build time,
// so keep them typed as possibly undefined and validate at runtime before use.
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Initialize EmailJS in the browser when public key is available
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      } catch (e) {
        // don't crash the app if init fails
        // eslint-disable-next-line no-console
        console.warn('EmailJS init failed', e);
      }
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kirtijhala1110@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Ensure EmailJS is configured
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      toast({
        title: "Configuration Error",
        description: "The email service is not configured. Please contact the site owner.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      if (result.text === 'OK') {
        toast({
          title: "Success",
          description: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error('Failed to send email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold mb-4 text-center">Get In Touch</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Let's collaborate on your next project or discuss opportunities
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  data-testid="input-email"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  data-testid="input-message"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                data-testid="button-send-message"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="font-mono text-sm" data-testid="text-email">kirtijhala1110@gmail.com</div>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCopyEmail}
                    data-testid="button-copy-email"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  data-testid="link-github-contact"
                >
                  <a href="https://github.com/JhalaKirti11" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  data-testid="link-linkedin-contact"
                >
                  <a href="https://www.linkedin.com/in/jhalakirti11/" target="_blank" rel="noopener noreferrer">
                    <SiLinkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  data-testid="link-email-contact"
                >
                  <a href="mailto:kirtijhala1110@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 bg-primary/5">
              <h3 className="text-lg font-semibold mb-2">Open to Opportunities</h3>
              <p className="text-sm text-muted-foreground">
                I'm currently open to full-stack development opportunities and freelance projects. Let's build something amazing together!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
