import { HeaderLink } from "@/designs/header/headerLink";
import { HeaderContent } from "@/types/sectionsTypes/header";
import React from "react";
import DesignButtons from "../designButtons";
interface HeaderMobMenuProps {
  headerContent: HeaderContent;
}
function HeaderMobMenu({ headerContent }: HeaderMobMenuProps) {
  return (
    <div>
      {headerContent.links.map((link) => (
        <div key={link.id}>
          <div className="p-3 border-b border-muted-bg">
            <HeaderLink link={link} />
          </div>
          {link.subLinks.map((subLink) => (
            <div key={subLink.id} className="p-3 px-6 border-b border-muted-bg">
              <HeaderLink link={subLink} />
            </div>
          ))}
        </div>
      ))}

      <DesignButtons
        buttons={headerContent.buttons}
        btnClassNames="w-full"
        btnContainerClassNames="p-3 flex flex-col-reverse gap-3"
      />
    </div>
  );
}

export default HeaderMobMenu;
