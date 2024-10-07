/* eslint-disable @nx/enforce-module-boundaries */
import { Call } from '@pages';

export default function Index({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <Call locale={locale} />;
}
