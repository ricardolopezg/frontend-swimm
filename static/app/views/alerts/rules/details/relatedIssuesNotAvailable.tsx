import * as React from 'react';
import styled from '@emotion/styled';

import Feature from 'app/components/acl/feature';
import Alert from 'app/components/alert';
import Button from 'app/components/button';
import Link from 'app/components/links/link';
import {Panel} from 'app/components/panels';
import {IconInfo} from 'app/icons';
import space from 'app/styles/space';

type Props = {
  buttonTo: React.ComponentProps<typeof Link>['to'];
  buttonText: string;
};

export const RELATED_ISSUES_QUERY_ERROR =
  'Error parsing search query: Boolean statements containing "OR" or "AND" are not supported in this search';

/**
 * Renders an Alert box of type "info" for boolean queries in alert details. Renders a discover link if the feature is available.
 */
export const RelatedIssuesNotAvailable = ({buttonTo, buttonText}: Props) => (
  <StyledAlert type="info">
    <Content>
      <IconInfo size="lg" />
      <div data-test-id="loading-error-message">
        Related Issues unavailable for this alert.
      </div>
      <Feature features={['discover-basic']}>
        <Button type="button" priority="default" size="small" to={buttonTo}>
          {buttonText}
        </Button>
      </Feature>
    </Content>
  </StyledAlert>
);

const StyledAlert = styled(Alert)`
  ${/* sc-selector */ Panel} & {
    border-radius: 0;
    border-width: 1px 0;
  }
`;

const Content = styled('div')`
  display: grid;
  grid-gap: ${space(1)};
  grid-template-columns: min-content auto max-content;
  align-items: center;
`;