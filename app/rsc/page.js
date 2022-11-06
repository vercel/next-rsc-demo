import { Suspense } from 'react';

// Shared Components
import Skeletons from '../../components/skeletons';

// Server Components
import SystemInfo from '../../components/server-info';

// Client Components
import Page from '../../components/page';
import Story from '../../components/story';
import Footer from '../../components/footer';
import ErrorPlaceholder from '../../components/error-placeholder';

// Utils
import fetchData from '../../lib/fetch-data';
import { transform } from '../../lib/get-item';
import useData from '../../lib/use-data';

function StoryWithData({ id }) {
  const { data } = useData(`s-${id}`, () =>
    fetchData(`item/${id}`).then(transform)
  );
  return <Story {...data} />;
}

function NewsWithData() {
  const { data: storyIds, error } = useData('top', () =>
    fetchData('topstories')
  );
  return (
    <>
      {error ? <ErrorPlaceholder error={error} /> : null}
      {storyIds
        ? storyIds.slice(0, 30).map((id) => {
            return <StoryWithData id={id} key={id} />;
          })
        : null}
    </>
  );
}

export default function RSCPage() {
  return (
    <Page>
      <Suspense fallback={<Skeletons />}>
        <NewsWithData />
      </Suspense>
      <Footer />
      <SystemInfo />
    </Page>
  );
}