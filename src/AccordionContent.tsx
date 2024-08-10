import RoundDetailsPage from "./RoundDetailsPage";
import { IRoundDetailsPage } from "./types";

export const AccordionContent: React.FC<IRoundDetailsPage> = ({ roundDetails }) => {
    return (
      <div className="p-4 bg-gray-100 border-t">
        <RoundDetailsPage roundDetails={roundDetails} />
      </div>
    );
};