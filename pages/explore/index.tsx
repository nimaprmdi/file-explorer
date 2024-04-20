import { TypeScriptIcon } from "@/components/icons/typescript";
import Card from "@/components/modules/Card";
import { FilesContext } from "@/context/FilesContextProvider";
import useFetchData from "@/hooks/useFetchFiles";
import { IFile } from "@/types/files";
import { findObjectByName } from "@/utils/helpers";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Explorer = () => {
  const router = useRouter();
  const [items, setItems] = useState<IFile[]>([]);
  const { slug } = router.query;
  const { state, dispatch } = useContext(FilesContext);

  // Fetch Data if not exist
  const { fetchData } = useFetchData();
  useEffect(() => {
    if (state.files && state.files.length === 0) {
      fetchData();
    } else {
      setItems(state.files);
    }

    console.log(state);
  }, [state]);

  // Filter Items
  useEffect(() => {
    if (slug) {
      const filteredItems = findObjectByName(state.files, slug[slug.length - 1]);
      filteredItems && setItems(filteredItems[0].children);
    }
  }, [state, slug]);

  return (
    <div className="my-4 flex gap-2 w-full gap-y-6 flex-wrap">
      {items && items.length ? (
        items.map((item) => (
          <Card
            key={`card-item-${uuidv4()}`}
            type={item.type}
            name={item.name}
            deletable={item.deleteable}
            childItems={item.children}
            id={item.id}
            icon={<TypeScriptIcon />}
          />
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export default Explorer;
