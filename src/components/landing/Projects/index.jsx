import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Card } from '../../common'
import starIcon from '../../../../static/icons/star.svg'
import forkIcon from '../../../../static/icons/fork.svg'
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const Projects = () => {
  const {
    github: {
      repositoryOwner: {
        repositories: { edges },
      },
    },
  } = useStaticQuery(graphql`
    {
      github {
        repositoryOwner(login: "boomerang-io") {
          repositories(
            first: 8
            orderBy: { field: STARGAZERS, direction: DESC }
          ) {
            edges {
              node {
                id
                name
                url
                description
                stargazers {
                  totalCount
                }
                forkCount
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Wrapper as={Container} id="projects">
      <h2>Projects</h2>
      <Grid>
        {edges.map(({ node }) => (
          <Item
            key={node.id}
            as="a"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <Content>
                <h3>{node.name}</h3>
                <p>{node.description}</p>
              </Content>
              <Stats>
                <div>
                  <img src={starIcon} alt="stars" />
                  <span>{node.stargazers.totalCount}</span>
                </div>
                <div>
                  <img src={forkIcon} alt="forks" />
                  <span>{node.forkCount}</span>
                </div>
              </Stats>
            </Card>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  )
}
