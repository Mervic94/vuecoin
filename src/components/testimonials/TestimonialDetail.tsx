
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Star, TrendingUp, Clock, DollarSign, Calendar, Target, CheckCircle, Lightbulb } from 'lucide-react';
import { Testimonial } from '@/data/testimonials';

interface TestimonialDetailProps {
  testimonial: Testimonial;
  onBack: () => void;
}

const TestimonialDetail = ({ testimonial, onBack }: TestimonialDetailProps) => {
  const getSectorColor = (sector: string) => {
    switch (sector) {
      case 'advertising': return 'bg-blue-100 text-blue-800';
      case 'real-estate': return 'bg-green-100 text-green-800';
      case 'transport': return 'bg-orange-100 text-orange-800';
      case 'ecommerce': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSectorLabel = (sector: string) => {
    switch (sector) {
      case 'advertising': return 'Publicité';
      case 'real-estate': return 'Immobilier-BTP';
      case 'transport': return 'Transport';
      case 'ecommerce': return 'E-commerce';
      default: return sector;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour aux témoignages
      </Button>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {testimonial.company.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{testimonial.company}</h1>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className={getSectorColor(testimonial.sector)}>
                      {getSectorLabel(testimonial.sector)}
                    </Badge>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Partenaire depuis {new Date(testimonial.implementationDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(testimonial.metrics.satisfactionScore)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold">
                  {testimonial.metrics.satisfactionScore}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contact Person */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Avatar className="w-12 h-12 mr-3">
                <AvatarImage src={testimonial.contactPerson.photo} />
                <AvatarFallback>
                  {testimonial.contactPerson.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{testimonial.contactPerson.name}</h3>
                <p className="text-muted-foreground">{testimonial.contactPerson.position}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4">
              "{testimonial.quote}"
            </blockquote>
          </CardContent>
        </Card>

        {/* Métriques de performance */}
        <Card>
          <CardHeader>
            <CardTitle>Métriques de performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">{testimonial.metrics.transactionVolume}</p>
                <p className="text-sm text-blue-700">Volume mensuel</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">{testimonial.metrics.costReduction}</p>
                <p className="text-sm text-green-700">Réduction des coûts</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-900">{testimonial.metrics.timeToSettlement}</p>
                <p className="text-sm text-orange-700">Temps de règlement</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">{testimonial.metrics.satisfactionScore}/5</p>
                <p className="text-sm text-purple-700">Score satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Retour d'expérience détaillé */}
        <Card>
          <CardHeader>
            <CardTitle>Retour d'expérience détaillé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{testimonial.detailedFeedback}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cas d'utilisation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Cas d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {testimonial.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">{useCase}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Défis et solutions */}
          <Card>
            <CardHeader>
              <CardTitle>Défis rencontrés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{testimonial.challenges}</p>
            </CardContent>
          </Card>
        </div>

        {/* Résultats et projets futurs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Résultats obtenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{testimonial.results}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                Projets futurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{testimonial.futureProjects}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestimonialDetail;
