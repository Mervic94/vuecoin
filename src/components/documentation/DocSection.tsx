
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DocSection {
  id: string;
  title: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

interface DocSectionProps {
  section: DocSection;
}

const DocSection = ({ section }: DocSectionProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return level;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{section.title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{section.category}</Badge>
            <Badge className={getLevelColor(section.level)}>
              {getLevelText(section.level)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          {section.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('```')) {
              const code = paragraph.replace(/```\w*\n?/g, '').trim();
              return (
                <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                  <code className="text-sm">{code}</code>
                </pre>
              );
            }
            if (paragraph.startsWith('# ')) {
              return <h3 key={index} className="text-lg font-semibold mt-6 mb-3">{paragraph.replace('# ', '')}</h3>;
            }
            if (paragraph.startsWith('## ')) {
              return <h4 key={index} className="text-md font-medium mt-4 mb-2">{paragraph.replace('## ', '')}</h4>;
            }
            return (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocSection;
