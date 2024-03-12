import {
  Button,
  Card,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router?.query;
  const [notes, setNotes] = useState();
  const { mutate } = useMutation();
  // const { data: listNotesQueries } = useQueries({ prefixUrl: id ? `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}` : ``, }, {
  //   onSuccess: (result) => {
  //     setNotes(result?.data)
  //   }
  // })

  const { data: listNotesQueries } = useQueries({ prefixUrl: id ? `/api/notes/${id}` : `` }, {
    onSuccess: (result) => {
      if (result) {
        setNotes(result?.data)
      }
    }
  })
  console.log("data listnotesqueries => ", listNotesQueries)

  const HandleSubmit = async () => {
    //   try {
    //     const response = await (
    //       await fetch(
    //         `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
    //         {
    //           method: "PATCH",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             title: notes?.title,
    //             description: notes?.description,
    //           }),
    //         }
    //       )
    //     ).json();
    //     if (result?.success) {
    //       router.push("/notes");
    //     }
    //   } catch (error) {}

    try {
      const response = await mutate({ url: `/api/notes/edit/${id}`, method: "PATCH", payload: notes });
      console.log("response => ", response)
      if (response?.success) {
        router.push("/notes")
      }
    } catch (error) {

    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                value={notes?.title || ""}
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                value={notes?.description || ""}
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Button onClick={() => HandleSubmit()} colorScheme="blue">
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
