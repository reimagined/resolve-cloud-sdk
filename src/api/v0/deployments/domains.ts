import * as t from 'io-ts'

import { defineSchema, ExtractSchemaTypes } from '../../../schemas'
import { InstallerEventNames } from '../../../constants'

const Namespace = 'Deployments / Domains'

/* SetDeploymentDomain */

export const SetDeploymentDomainSchema = defineSchema({
  Namespace,
  Description: 'Assigns a domain to a deployment.',
  Path: '/v0/deployments/:deploymentId/domain',
  Method: 'PUT',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({ domain: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.setDeploymentDomain),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
      domain: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, domain }) => ({
    params: { deploymentId },
    body: { domain },
    query: {},
  }),
})

export type SetDeploymentDomain = ExtractSchemaTypes<typeof SetDeploymentDomainSchema>

/* UnsetDeploymentDomain */

export const UnsetDeploymentDomainSchema = defineSchema({
  Namespace,
  Description: 'Detach a domain from a deployment.',
  Path: '/v0/deployments/:deploymentId/domain',
  Method: 'DELETE',
  Mode: 'ASYNC',
  Params: t.type({ deploymentId: t.string }),
  Body: t.type({ domain: t.string }),
  Query: t.type({}),
  Event: t.type({
    name: t.literal(InstallerEventNames.unsetDeploymentDomain),
    payload: t.type({
      userId: t.string,
      deploymentId: t.string,
      domain: t.string,
    }),
  }),
  Result: t.void,
  ArgumentsTransformer: ({ deploymentId, domain }) => ({
    params: { deploymentId },
    body: { domain },
    query: {},
  }),
})

export type UnsetDeploymentDomain = ExtractSchemaTypes<typeof UnsetDeploymentDomainSchema>
