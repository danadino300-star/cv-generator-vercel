import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText, Download, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const cvFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "Le rôle doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(5, "Numéro de téléphone invalide"),
  location: z.string().min(2, "La localisation est requise"),
  summary: z.string().min(50, "Le résumé doit contenir au moins 50 caractères"),
});

type CVFormValues = z.infer<typeof cvFormSchema>;

export default function CVGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<CVFormValues | null>(null);

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

  const onSubmit = (data: CVFormValues) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCV(data);
      setIsGenerating(false);
    }, 1500);
  };

  const handlePayPalPayment = () => {
    alert("Redirection vers PayPal pour le paiement...\n\nNote: Intégration PayPal à configurer.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-3">
            Générateur de CV Professionnel
          </h1>
          <p className="text-muted-foreground text-lg">
            Créez votre CV professionnel en quelques minutes
          </p>
        </motion.div>

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
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger en PDF
                    </Button>

                    <Button
                      className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
                      onClick={handlePayPalPayment}
                      data-testid="button-paypal"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payer avec PayPal
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
