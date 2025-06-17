
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick: () => void;
}

const TestimonialCard = ({ testimonial, onClick }: TestimonialCardProps) => {
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
    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full" onClick={onClick}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {testimonial.company.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{testimonial.company}</h3>
              <Badge className={getSectorColor(testimonial.sector)}>
                {getSectorLabel(testimonial.sector)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(testimonial.metrics.satisfactionScore)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {testimonial.metrics.satisfactionScore}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={testimonial.contactPerson.photo} />
            <AvatarFallback>
              {testimonial.contactPerson.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{testimonial.contactPerson.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.contactPerson.position}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <blockquote className="text-muted-foreground italic mb-4 line-clamp-3">
          "{testimonial.quote}"
        </blockquote>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="font-semibold text-sm">{testimonial.metrics.transactionVolume}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-muted-foreground">Réduction coûts</p>
              <p className="font-semibold text-sm">{testimonial.metrics.costReduction}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-orange-600" />
          <div>
            <p className="text-xs text-muted-foreground">Temps de règlement</p>
            <p className="font-semibold text-sm">{testimonial.metrics.timeToSettlement}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
