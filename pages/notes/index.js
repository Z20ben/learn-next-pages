import { Box, Button, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const LayoutComponent = dynamic(() => import("@/layout"))
export default function Notes({ }) {
  const { mutate } = useMutation();
  // const { data, isLoading } = useQueries({ prefixUrl: "/api/notes" })
  const { data, isLoading } = useSWR("/api/notes", fetcher, { revalidateonFocus: true })


  const router = useRouter();
  const [notes, setNotes] = useState();

  const HandleDelete = async (id) => {
    try {
      const result = await mutate({ url: `/api/notes/delete/${id}`, payload: notes });
      if (result?.success) {
        router.reload();
      }
    } catch (error) { }
  };

  // useEffect(() => {
  //   async function fetchingData() {
  //     const listNotes = await (await fetch("/api/notes")).json();
  //     setNotes(listNotes)
  //   }
  //   fetchingData();
  // }, []);


  return (
    <>
      <LayoutComponent metaTitle="Notes" metaDescription="Semua informasi catatan" >
        <Box padding='5'>
          <Flex justifyContent='end'>
            <Button colorScheme={'blue'} onClick={() => router.push("/notes/add")}>Add Notes</Button>
          </Flex>
          {isLoading ? (
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Flex>
          ) : (
            <Flex>
              <Grid templateColumns='repeat(3, 1fr)' gap={5}>
                {data?.data?.map((item) => (
                  <GridItem key={item}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                      <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                      >
                        <Button onClick={() => router.push(`/notes/edit/${item?.id}`)} flex='1' colorScheme='orange'>
                          Edit
                        </Button>
                        <Button onClick={() => HandleDelete(item?.id)} flex='1' colorScheme='red' >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          )}

        </Box>
        {/* {notes.data.map((item) => (
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))} */}
      </LayoutComponent>
    </>
  )
}
