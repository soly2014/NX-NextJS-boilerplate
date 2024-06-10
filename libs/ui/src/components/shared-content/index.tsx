import React from 'react';
import { Alert } from '../../atoms/alert';
import { Card } from '../../atoms/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../atoms/accordion';
import { Badge } from '../../atoms/badge';

type Props = {
  client: 'sbc' | 'moi';
};

export const SharedContent = ({ client }: Props) => {
  return (
    <div className="p-4 space-y-8">
      <Alert>This is a warning alert for {client}</Alert>

      <Card title="Accordion Example">
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              This is the content of the first accordion item.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              This is the content of the second accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card title="Avatar and Badge Example">
        <div className="flex items-center space-x-4">
          <Badge>Info Badge</Badge>
        </div>
      </Card>
    </div>
  );
};
