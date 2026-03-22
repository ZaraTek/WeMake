import { useState } from "react";
import ProfileHeader from './ProfileHeader';
import { ProfileData } from "types/profile";

const FakeConvexProfileHeader = ({ className = "" }) => {
    const [profileData] = useState<ProfileData>({
        username: "Zara",
        pfpUrl: "https://scontent-atl3-2.cdninstagram.com/v/t51.82787-19/645613880_18105184423869616_3083438098901484039_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFcOCS1LhSdqIEZ3D0et4bEc-dRkRok1maxmbsnyVU50f1-ffx-ciCJZdziAR_4sX8&_nc_ohc=epE0N4v-UwkQ7kNvwFWzjUK&_nc_gid=IaQmc3Ox1Qv4aGRuV9macg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfyXqL1mJnyZMKDbXMpL1r71QGWhWPBA-QUP_Piy3LNWYw&oe=69C4F94F&_nc_sid=7a9f4bhttps://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOTGu0B8vlwuXsUgBd3nRZzhH6NG28iT79YaPyx",
        bannerUrl: "https://3zvd30k5c0.ufs.sh/f/1nBmZSdINcOT2n2mpIlzRJ7GlhnTs6mxauvStKPMjNqeEgdA"
    });

    return <ProfileHeader profileData={profileData} className={className} />;
};

export default FakeConvexProfileHeader;