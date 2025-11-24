import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText, Download, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import PayPalButton from "@/components/PayPalButton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const cvFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "Le rôle doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(5, "Numéro de téléphone invalide"),
  location: z.string().min(2, "La localisation est requise"),
  summary: z.string().min(50, "Le résumé doit contenir au moins 50 caractères"),
});

type CVFormValues = z.infer<typeof cvFormSchema>;

interface UserStatus {
  cvCount: number;
  hasPaid: boolean;
  canGenerateCV: boolean;
}

export default function CVGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<CVFormValues | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<CVFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
  });

  const checkUserStatus = async (email: string) => {
    try {
      const response = await fetch(`/api/user/${encodeURIComponent(email)}`);
      const user = await response.json();
      
      const canGenerate = user.cvCount < 2 || user.hasPaid;
      setUserStatus({
        cvCount: user.cvCount,
        hasPaid: user.hasPaid,
        canGenerateCV: canGenerate,
      });
      
      return canGenerate;
    } catch (err) {
      console.error("Error checking user status:", err);
      return false;
    }
  };

  const onSubmit = async (data: CVFormValues) => {
    setError("");
    setSuccess("");
    setIsGenerating(true);
    setCurrentEmail(data.email);

    try {
      // Check user status
      const canGenerate = await checkUserStatus(data.email);
      
      if (!canGenerate) {
        setShowPayment(true);
        setIsGenerating(false);
        setError("Vous avez atteint la limite de 2 CV gratuits. Veuillez effectuer un paiement de 2$ pour continuer.");
        return;
      }

      // Create CV
      const response = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.requiresPayment) {
          setShowPayment(true);
          setError("Vous avez atteint la limite de 2 CV gratuits. Veuillez effectuer un paiement de 2$ pour continuer.");
        } else {
          setError("Erreur lors de la création du CV");
        }
        setIsGenerating(false);
        return;
      }

      setGeneratedCV(data);
      setSuccess("CV généré avec succès !");
      await checkUserStatus(data.email);
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePaymentComplete = async () => {
    try {
      const response = await fetch("/api/payment/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentEmail }),
      });

      if (response.ok) {
        setSuccess("Paiement effectué avec succès ! Vous pouvez maintenant générer des CV illimités.");
        setShowPayment(false);
        await checkUserStatus(currentEmail);
      }
    } catch (err) {
      setError("Erreur lors de l'enregistrement du paiement");
    }
  };

  // Listen for PayPal payment completion
  useEffect(() => {
    const handlePayPalSuccess = () => {
      handlePaymentComplete();
    };

    window.addEventListener("paypal-payment-success", handlePayPalSuccess);
    return () => {
      window.removeEventListener("paypal-payment-success", handlePayPalSuccess);
    };
  }, [currentEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 print:p-0 print:bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-3">
            Générateur de CV Professionnel
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Créez votre CV professionnel en quelques minutes
          </p>
          
          {userStatus && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
              <span className="text-sm text-muted-foreground">
                CV créés : <strong>{userStatus.cvCount}/2</strong>
              </span>
              {userStatus.hasPaid && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  ✓ Premium
                </span>
              )}
            </div>
          )}
        </motion.div>

        {error && (
          <Alert variant="destructive" className="mb-6 max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 max-w-2xl mx-auto bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {showPayment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="text-center mb-4">
                <CreditCard className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Débloquer les CV illimités</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pour seulement 2$, générez autant de CV que vous voulez !
                </p>
                <div className="text-3xl font-bold text-blue-600 mb-6">2,00 $</div>
              </div>
              
              <div className="flex justify-center">
                <PayPalButton amount="2.00" currency="USD" intent="CAPTURE" />
              </div>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Mode Sandbox (Test) - Aucun paiement réel ne sera effectué
              </p>
            </Card>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Informations personnelles</h2>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rima Hazem"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poste / Titre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Graphic Designer"
                            {...field}
                            data-testid="input-role"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="rima@example.com"
                            {...field}
                            data-testid="input-email"
                            onBlur={(e) => {
                              field.onBlur();
                              if (e.target.value && cvFormSchema.shape.email.safeParse(e.target.value).success) {
                                checkUserStatus(e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+213 555 123 456"
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localisation</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Alger, Algérie"
                            {...field}
                            data-testid="input-location"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Résumé professionnel</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre parcours et vos compétences..."
                            className="min-h-[120px]"
                            {...field}
                            data-testid="input-summary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isGenerating}
                    data-testid="button-generate"
                  >
                    {isGenerating ? (
                      <>Génération en cours...</>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Générer mon CV
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          {/* Aperçu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Aperçu du CV</h2>
              
              {generatedCV ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-lg">
                    <h3 className="text-2xl font-serif font-bold mb-1">
                      {generatedCV.name}
                    </h3>
                    <p className="text-slate-300 text-sm uppercase tracking-wider mb-4">
                      {generatedCV.role}
                    </p>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p data-testid="text-email">📧 {generatedCV.email}</p>
                      <p data-testid="text-phone">📱 {generatedCV.phone}</p>
                      <p data-testid="text-location">📍 {generatedCV.location}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Résumé professionnel</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-summary">
                      {generatedCV.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button
                      className="w-full"
                      variant="outline"
                      data-testid="button-download"
                      onClick={() => window.print()}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger en PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Remplissez le formulaire pour voir l'aperçu de votre CV</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
