const config = require("config").get("databases.postgres");

const {Sequelize, Op, literal} = require("sequelize");

/** ===================================================================================================== **/
/**
 * Game Center Models and Database
 */

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);
// const sequelize = new Sequelize(config.database, config.username, config.password, {
// 	...config.options,
// 	...{ logging: console.log },
// });

sequelize
    .authenticate()
    .then(() => {
        // console.log(`*** Syncing database...`);
    })
    .catch((e) => {
        console.log("*** POSTGRES Error: ", e);
    });

const __user = require("./models/user");
const User = sequelize.define("user", __user.attributes, __user.options);


const __userWallet = require("./models/userWallet");
const UserWallet = sequelize.define("userWallet", __userWallet.attributes, __userWallet.options);

const __userSession = require("./models/userSession");
const UserSession = sequelize.define("userSession", __userSession.attributes, __userSession.options);

const __userNotification = require("./models/userNotification");
const UserNotification = sequelize.define(
    "userNotification",
    __userNotification.attributes,
    __userNotification.options
);

const __asset = require("./models/asset");
const Asset = sequelize.define("asset", __asset.attributes, __asset.options);

const __settings = require("./models/settings");
const Settings = sequelize.define("setting", __settings.attributes, __settings.options);

const __referralReward = require("./models/referralReward");
const ReferralReward = sequelize.define("referralReward", __referralReward.attributes, __referralReward.options);

const __userTransaction = require("./models/userTransaction");
const UserTransaction = sequelize.define("userTransaction", __userTransaction.attributes, __userTransaction.options);


const __userErrorTransaction = require("./models/userErrorTransaction");
const UserErrorTransaction = sequelize.define(
    "userErrorTransaction",
    __userErrorTransaction.attributes,
    __userErrorTransaction.options
);

const __assetNetwork = require("./models/assetNetwork");
const AssetNetwork = sequelize.define("assetNetwork", __assetNetwork.attributes, __assetNetwork.options);

const __network = require("./models/network");
const Network = sequelize.define("network", __network.attributes, __network.options);

const __systemWallet = require("./models/systemWallet");
const SystemWallet = sequelize.define("systemWallet", __systemWallet.attributes, __systemWallet.options);

const __manager = require("./models/manager");
const Manager = sequelize.define("manager", __manager.attributes, __manager.options);

const __managerSession = require("./models/managerSession");
const ManagerSession = sequelize.define("managerSession", __managerSession.attributes, __managerSession.options);

const __auction = require("./models/auction");
const Auction = sequelize.define("auction", __auction.attributes, __auction.options);

const __auctionOffer = require("./models/auctionOffer");
const AuctionOffer = sequelize.define("auctionOffer", __auctionOffer.attributes, __auctionOffer.options);

const __userAuctionTrade = require("./models/userAuctionTrade");
const UserAuctionTrade = sequelize.define(
    "userAuctionTrade",
    __userAuctionTrade.attributes,
    __userAuctionTrade.options
);

const __category = require("./models/category");
const Category = sequelize.define("category", __category.attributes, __category.options);

const __categoryTranslation = require("./models/categoryTranslation");
const CategoryTranslation = sequelize.define(
    "categoryTranslation",
    __categoryTranslation.attributes,
    __categoryTranslation.options
);

const __language = require("./models/language");
const Language = sequelize.define("language", __language.attributes, __language.options);

const __blog = require("./models/blog");
const Blog = sequelize.define("blog", __blog.attributes, __blog.options);

const __blogTranslation = require("./models/blogTranslation");
const BlogTranslation = sequelize.define("blogTranslation", __blogTranslation.attributes, __blogTranslation.options);

const __assignedCard = require("./models/assignedCard");
const AssignedCard = sequelize.define("assignedCard", __assignedCard.attributes, __assignedCard.options);


const __bonus = require("./models/bonus");
const Bonus = sequelize.define("bonus", __bonus.attributes, __bonus.options);

const __userBonus = require("./models/userBonus");
const UserBonus = sequelize.define("userBonus", __userBonus.attributes, __userBonus.options);

const __managerNotification = require("./models/managerNotification");
const ManagerNotification = sequelize.define(
    "managerNotification",
    __managerNotification.attributes,
    __managerNotification.options
);


const __swapTransaction = require("./models/swapTransaction");
const SwapTransaction = sequelize.define("swapTransactions", __swapTransaction.attributes, __swapTransaction.options);


const __currency = require("./models/Currency");
const Currency = sequelize.define("currencies", __currency.attributes, __currency.options);


const __competition = require("./models/competition");
const Competition = sequelize.define("competition", __competition.attributes, __competition.options);

const __competitionLeague = require("./models/competitionLeague");
const CompetitionLeague = sequelize.define(
    "competitionLeague",
    __competitionLeague.attributes,
    __competitionLeague.options
);
const __competitionTask = require("./models/competitionTask");
const CompetitionTask = sequelize.define("competitionTask", __competitionTask.attributes, __competitionTask.options);

const __prize = require("./models/prize");
const Prize = sequelize.define("prize", __prize.attributes, __prize.options);

/*
const __prizePool = require("./models/prizePool");
const PrizePool = sequelize.define("prizePool", __prizePool.attributes, __prizePool.options);
*/

const __matchParticipantTeam = require("./models/matchParticipantTeam");
const MatchParticipantTeam = sequelize.define(
    "matchParticipantTeam",
    __matchParticipantTeam.attributes,
    __matchParticipantTeam.options
);


const __matchParticipant = require("./models/matchParticipant");
const MatchParticipant = sequelize.define(
    "matchParticipant",
    __matchParticipant.attributes,
    __matchParticipant.options
);


const __fee = require("./models/fee");
const Fee = sequelize.define("fee", __fee.attributes, __fee.options);

const __department = require("./models/department");
const Department = sequelize.define("department", __department.attributes, __department.options);

const __ticket = require("./models/ticket");
const Ticket = sequelize.define("ticket", __ticket.attributes, __ticket.options);

const __reply = require("./models/reply");
const Reply = sequelize.define("reply", __reply.attributes, __reply.options);

const __userPrize = require("./models/userPrize");
const UserPrize = sequelize.define("userPrizes", __userPrize.attributes, __userPrize.options);


const __card = require("./models/card");
const Card = sequelize.define("card", __card.attributes, __card.options);

const __owner = require("./models/owner");
const Owner = sequelize.define("owner", __owner.attributes, __owner.options);

Owner.sync({alter: true}).then().catch((err) => {});

const __cardType = require("./models/cardType");
const CardType = sequelize.define("cardTypes", __cardType.attributes, __cardType.options);



const __statistic = require("./models/statistic");
const Statistic = sequelize.define("statistic", __statistic.attributes, __statistic.options);

const __country = require("./models/country");
const Country = sequelize.define("country", __country.attributes, __country.options);


const __userPayment = require("./models/userPayment");
const UserPayment = sequelize.define("userPayment", __userPayment.attributes, __userPayment.options);

const __contactUs = require("./models/contactUs");
const ContactUs = sequelize.define("contactUs", __contactUs.attributes, __contactUs.options);

const __emailSubscribe = require("./models/emailSubscribe");
const EmailSubscribe = sequelize.define("emailSubscribe", __emailSubscribe.attributes, __emailSubscribe.options);

const __referralStatistic = require("./models/referralStatistic");
const ReferralStatistic = sequelize.define(
    "referralStatistic",
    __referralStatistic.attributes,
    __referralStatistic.options
);

const __role = require("./models/role");
const Role = sequelize.define("role", __role.attributes, __role.options);

const __permission = require("./models/permission");
const Permission = sequelize.define("permission", __permission.attributes, __permission.options);

const __auctionLog = require("./models/auctionLog");
const AuctionLog = sequelize.define("auctionLogs", __auctionLog.attributes, __auctionLog.options);

const __giveAway = require("./models/giveaway");
const GiveAway = sequelize.define("giveaways", __giveAway.attributes, __giveAway.options);

const __tokenPrize = require("./models/tokenPrize");
const TokenPrize = sequelize.define("tokenPrizes", __tokenPrize.attributes, __tokenPrize.options);

const __userTokenPrize = require("./models/userTokenPrize");
const UserTokenPrize = sequelize.define("userTokenPrizes", __userTokenPrize.attributes, __userTokenPrize.options);

const __agentSession = require("./models/agentSession");
const AgentSession = sequelize.define("agentSession", __agentSession.attributes, __agentSession.options);

const __agentStatistic = require("./models/agentStatistic");
const AgentStatistic = sequelize.define("agentStatistic", __agentStatistic.attributes, __agentStatistic.options);

const __agentReward = require("./models/agentReward");
const AgentReward = sequelize.define("agentReward", __agentReward.attributes, __agentReward.options);

const __agentLink = require("./models/agentLink");
const AgentLink = sequelize.define("agentLink", __agentLink.attributes, __agentLink.options);

const __agentLinkStatistic = require("./models/agentLinkStatistic");
const AgentLinkStatistic = sequelize.define(
    "agentLinkStatistic",
    __agentLinkStatistic.attributes,
    __agentLinkStatistic.options
);

const __agentReport = require("./models/agentReport");
const AgentReport = sequelize.define("agentReports", __agentReport.attributes, __agentReport.options);

const __attribute = require("./models/attribute");
const Attribute = sequelize.define("attribute", __attribute.attributes, __attribute.options);

const __userAttribute = require("./models/userAttribute");
const UserAttribute = sequelize.define("userAttribute", __userAttribute.attributes, __userAttribute.options);

const __box = require("./models/box");
const Box = sequelize.define("box", __box.attributes, __box.options);

const __userBox = require("./models/userBox");
const UserBox = sequelize.define("userBox", __userBox.attributes, __userBox.options);

const __boxAuction = require("./models/boxAuction");
const BoxAuction = sequelize.define("boxAuction", __boxAuction.attributes, __boxAuction.options);

const __boxSetting = require("./models/boxSetting");
const BoxSetting = sequelize.define("boxSetting", __boxSetting.attributes, __boxSetting.options);

const __boxTrade = require("./models/boxTrade");
const BoxTrade = sequelize.define("boxTrade", __boxTrade.attributes, __boxTrade.options);

const __lensSetting = require("./models/lensSetting");
const LensSetting = sequelize.define("lensSetting", __lensSetting.attributes, __lensSetting.options);

const __lens = require("./models/lens");
const Lens = sequelize.define("lens", __lens.attributes, __lens.options);

const __lensAuction = require("./models/lensAuction");
const LensAuction = sequelize.define("lensAuction", __lensAuction.attributes, __lensAuction.options);

const __lensTrade = require("./models/lensTrade");
const LensTrade = sequelize.define("lensTrade", __lensTrade.attributes, __lensTrade.options);

const __userLens = require("./models/userLens");
const UserLens = sequelize.define("userLens", __userLens.attributes, __userLens.options);

const __userPost = require("./models/userPost");
const UserPost = sequelize.define("userPost", __userPost.attributes, __userPost.options);

const __telegramChat = require("./models/TelegramChat");
const TelegramChat = sequelize.define("telegramChat", __telegramChat.attributes, __telegramChat.options);

const __userCollection = require("./models/UserCollection");
const UserCollection = sequelize.define("UserCollection", __userCollection.attributes, __userCollection.options);

const __userToken = require("./models/UserToken");
const UserToken = sequelize.define("UserToken", __userToken.attributes, __userToken.options);

const __userAssignedToken = require("./models/UserAssignedToken");
const UserAssignedToken = sequelize.define("UserAssignedToken", __userAssignedToken.attributes, __userAssignedToken.options);

const __userActivity = require("./models/UserActivity");
const UserActivity = sequelize.define("UserActivity", __userActivity.attributes, __userActivity.options);

const __userAuctions = require("./models/UserAuctions");
const UserAuctions = sequelize.define("UserAuctions", __userAuctions.attributes, __userAuctions.options);

const __userExplore = require("./models/UserExplore");
const UserExplore = sequelize.define("UserExploreَ", __userExplore.attributes, __userExplore.options);

const __eventBlockNumber = require("./models/EventBlockNumber");
const EventBlockNumber = sequelize.define("EventBlockNumber", __eventBlockNumber.attributes, __eventBlockNumber.options);

const __userCollectionStats = require("./models/UserCollectionStats");
const UserCollectionStats = sequelize.define("UserCollectionStats", __userCollectionStats.attributes, __userCollectionStats.options);


UserPost.belongsTo(User, {foreignKey: "userId"});

LensSetting.hasMany(Lens, {foreignKey: "lensSettingId"});
Lens.belongsTo(LensSetting, {foreignKey: "lensSettingId"});

Lens.hasMany(LensAuction, {foreignKey: "lensId", as: "lens"});
LensAuction.belongsTo(Lens, {foreignKey: "lensId", as: "lens"});

Asset.hasMany(LensAuction, {foreignKey: "assetId"});
LensAuction.belongsTo(Asset, {foreignKey: "assetId"});

LensAuction.hasMany(LensTrade, {foreignKey: "lensAuctionId"});
LensTrade.belongsTo(LensAuction, {foreignKey: "lensAuctionId"});

User.hasMany(LensTrade, {foreignKey: "userId"});
LensTrade.belongsTo(User, {foreignKey: "userId"});

User.hasMany(UserLens, {foreignKey: "userId"});
UserLens.belongsTo(User, {foreignKey: "userId"});

Lens.hasMany(UserLens, {foreignKey: "lensId"});
UserLens.belongsTo(Lens, {foreignKey: "lensId"});

LensAuction.hasMany(UserLens, {foreignKey: "lensAuctionId"});
UserLens.belongsTo(LensAuction, {foreignKey: "lensAuctionId"});

User.hasMany(BoxTrade, {foreignKey: "userId"});
BoxTrade.belongsTo(User, {foreignKey: "userId"});


BoxAuction.hasMany(BoxTrade, {foreignKey: "boxAuctionId"});
BoxTrade.belongsTo(BoxAuction, {foreignKey: "boxAuctionId"});

CardType.hasMany(BoxSetting, {foreignKey: "cardTypeId"});
BoxSetting.belongsTo(CardType, {foreignKey: "cardTypeId"});

CardType.hasMany(Box, {foreignKey: "cardTypeId"});
Box.belongsTo(CardType, {foreignKey: "cardTypeId"});

Card.hasMany(Box, {foreignKey: "cardId"});
Box.belongsTo(Card, {foreignKey: "cardId"});

Lens.hasMany(Box, {foreignKey: "lensId"});
Box.belongsTo(Lens, {foreignKey: "lensId"});

User.hasMany(UserBox, {foreignKey: "userId"});
UserBox.belongsTo(User, {foreignKey: "userId"});

Box.hasMany(UserBox, {foreignKey: "boxId"});
UserBox.belongsTo(Box, {foreignKey: "boxId"});

BoxAuction.hasMany(UserBox, {foreignKey: "boxAuctionId"});
UserBox.belongsTo(BoxAuction, {foreignKey: "boxAuctionId"});

Box.hasMany(BoxAuction, {foreignKey: "boxId"});
BoxAuction.belongsTo(Box, {foreignKey: "boxId"});

Asset.hasMany(BoxAuction, {foreignKey: "assetId"});
BoxAuction.belongsTo(Asset, {foreignKey: "assetId"});

CardType.hasMany(Attribute, {foreignKey: "cardTypeId"});
Attribute.belongsTo(CardType, {foreignKey: "cardTypeId"});

User.hasMany(UserAttribute, {foreignKey: "userId"});
UserAttribute.belongsTo(User, {foreignKey: "userId"});

Card.hasMany(UserAttribute, {foreignKey: "cardId"});
UserAttribute.belongsTo(Card, {foreignKey: "cardId"});

Attribute.hasMany(UserAttribute, {foreignKey: "attributeId"});
UserAttribute.belongsTo(Attribute, {foreignKey: "attributeId"});

Asset.hasMany(UserAttribute, {foreignKey: "assetId"});
UserAttribute.belongsTo(Asset, {foreignKey: "assetId"});

CompetitionLeague.hasMany(UserAttribute, {foreignKey: "competitionLeagueId"});
UserAttribute.belongsTo(CompetitionLeague, {foreignKey: "competitionLeagueId"});

CompetitionTask.hasMany(UserAttribute, {foreignKey: "competitionTaskId"});
UserAttribute.belongsTo(CompetitionTask, {foreignKey: "competitionTaskId"});

BoxTrade.hasMany(UserAttribute, {foreignKey: "boxTradeId"});
UserAttribute.belongsTo(BoxTrade, {foreignKey: "boxTradeId"});

UserLens.hasMany(UserAttribute, {foreignKey: "userLensId"});
UserAttribute.belongsTo(UserLens, {foreignKey: "userLensId"});

CardType.hasMany(TokenPrize, {foreignKey: "cardTypeId"});
TokenPrize.belongsTo(CardType, {foreignKey: "cardTypeId"});

Asset.hasMany(TokenPrize, {foreignKey: "assetId"});
TokenPrize.belongsTo(Asset, {foreignKey: "assetId"});

Asset.hasMany(Prize, {foreignKey: "assetId"});
Prize.belongsTo(Asset, {foreignKey: "assetId"});

GiveAway.belongsTo(Asset, {foreignKey: "assetId"});
GiveAway.belongsTo(User, {foreignKey: "userId"});

User.hasMany(UserTokenPrize, {foreignKey: "userId"});
UserTokenPrize.belongsTo(User, {foreignKey: "userId"});

Competition.hasMany(UserTokenPrize, {foreignKey: "competitionId"});
UserTokenPrize.belongsTo(Competition, {foreignKey: "competitionId"});

CompetitionLeague.hasMany(CompetitionTask, {foreignKey: "competitionLeagueId"});
CompetitionTask.belongsTo(CompetitionLeague, {foreignKey: "competitionLeagueId"});

Asset.hasMany(UserTokenPrize, {foreignKey: "assetId"});
UserTokenPrize.belongsTo(Asset, {foreignKey: "assetId"});

User.hasMany(ReferralReward, {foreignKey: "userId", as: "user"});
ReferralReward.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(ReferralReward, {foreignKey: "referredUserId", as: "referredUser"});
ReferralReward.belongsTo(User, {foreignKey: "referredUserId", as: "referredUser"});

Prize.hasMany(CompetitionLeague, {foreignKey: "prizeId"});
CompetitionLeague.belongsTo(Prize, {foreignKey: "prizeId"});

Prize.belongsTo(CardType, {foreignKey: "cardTypeId"});
CardType.hasMany(Prize, {foreignKey: "cardTypeId"});

// Prize.hasMany(PrizePool, { foreignKey: "prizeId" });
// PrizePool.belongsTo(Prize, { foreignKey: "prizeId" });

// CardType.hasMany(PrizePool, { foreignKey: "cardTypeId" });
// PrizePool.belongsTo(CardType, { foreignKey: "cardTypeId" });

// Asset.hasMany(PrizePool, { foreignKey: "assetId" });
// PrizePool.belongsTo(Asset, { foreignKey: "assetId" });

CardType.hasMany(CompetitionLeague, {foreignKey: "cardTypeId"});
CompetitionLeague.belongsTo(CardType, {foreignKey: "cardTypeId"});

Competition.hasMany(CompetitionLeague, {foreignKey: "competitionId"});
CompetitionLeague.belongsTo(Competition, {foreignKey: "competitionId"});

Asset.hasMany(CompetitionLeague, {foreignKey: "assetId"});
CompetitionLeague.belongsTo(Asset, {foreignKey: "assetId"});

CardType.hasMany(UserPrize, {foreignKey: "cardTypeId"});
UserPrize.belongsTo(CardType, {foreignKey: "cardTypeId"});

Competition.hasMany(UserPrize, {foreignKey: "competitionId"});
UserPrize.belongsTo(Competition, {foreignKey: "competitionId"});

Asset.hasMany(UserPrize, {foreignKey: "assetId"});
UserPrize.belongsTo(Asset, {foreignKey: "assetId"});

User.hasMany(UserPrize, {foreignKey: "userId"});
UserPrize.belongsTo(User, {foreignKey: "userId"});

CompetitionLeague.hasMany(UserPrize, {foreignKey: "competitionLeagueId"});
UserPrize.belongsTo(CompetitionLeague, {foreignKey: "competitionLeagueId"});

CardType.hasMany(Bonus, {foreignKey: "cardTypeId"});
Bonus.belongsTo(CardType, {foreignKey: "cardTypeId"});

CardType.hasMany(UserBonus, {foreignKey: "cardTypeId"});
UserBonus.belongsTo(CardType, {foreignKey: "cardTypeId"});

User.hasMany(UserBonus, {foreignKey: "userId"});
UserBonus.belongsTo(User, {foreignKey: "userId"});

Bonus.hasMany(UserBonus, {foreignKey: "bonusId"});
UserBonus.belongsTo(Bonus, {foreignKey: "bonusId"});

CardType.hasMany(Card, {foreignKey: "cardTypeId"});
Card.belongsTo(CardType, {foreignKey: "cardTypeId"});

Card.hasMany(AssignedCard, {foreignKey: "cardId"});
AssignedCard.belongsTo(Card, {foreignKey: "cardId"});

User.hasMany(AssignedCard, {foreignKey: "userId"});
AssignedCard.belongsTo(User, {foreignKey: "userId"});

User.hasMany(UserAuctionTrade, {foreignKey: "payerId", as: "payerAuctionTrade"});
UserAuctionTrade.belongsTo(User, {foreignKey: "payerId", as: "payer"});

User.hasMany(UserAuctionTrade, {foreignKey: "payeeId", as: "payeeAuctionTrade"});
UserAuctionTrade.belongsTo(User, {foreignKey: "payeeId", as: "payee"});

Auction.hasMany(UserAuctionTrade, {foreignKey: "auctionId", as: "auctionTrade"});
UserAuctionTrade.belongsTo(Auction, {foreignKey: "auctionId", as: "auction"});

User.hasMany(Auction, {foreignKey: "userId", as: "auction"});
Auction.belongsTo(User, {foreignKey: "userId", as: "user"});

AssignedCard.hasMany(Auction, {foreignKey: "assignedCardId"});
Auction.belongsTo(AssignedCard, {foreignKey: "assignedCardId"});

Auction.hasMany(AuctionOffer, {foreignKey: "auctionId"});
AuctionOffer.belongsTo(Auction, {foreignKey: "auctionId"});

User.hasMany(AuctionOffer, {foreignKey: "userId"});
AuctionOffer.belongsTo(User, {foreignKey: "userId"});

Manager.hasMany(ManagerSession, {foreignKey: "userId", as: "sessions"});
ManagerSession.belongsTo(Manager, {foreignKey: "userId", as: "manager"});

User.hasMany(UserSession, {foreignKey: "userId", as: "sessions"});
UserSession.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(UserWallet, {foreignKey: "userId", as: "assets"});
UserWallet.belongsTo(User, {foreignKey: "userId", as: "user"});

Asset.hasMany(UserWallet, {foreignKey: "assetId", as: "wallets"});
UserWallet.belongsTo(Asset, {foreignKey: "assetId", as: "asset"});

User.hasMany(UserNotification, {foreignKey: "userId"});
UserNotification.belongsTo(User, {foreignKey: "userId"});

Asset.hasMany(AssetNetwork, {foreignKey: "assetId", as: "networks"});
AssetNetwork.belongsTo(Asset, {foreignKey: "assetId", as: "asset"});

Network.hasMany(AssetNetwork, {foreignKey: "networkId", as: "assetNetworks"});
AssetNetwork.belongsTo(Network, {foreignKey: "networkId", as: "network"});

SystemWallet.belongsTo(Asset, {foreignKey: "assetId", as: "asset"});

User.hasMany(UserTransaction, {foreignKey: "userId", as: "transaction"});
UserTransaction.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(UserErrorTransaction, {foreignKey: "userId"});
UserErrorTransaction.belongsTo(User, {foreignKey: "userId"});

Asset.hasMany(UserTransaction, {
    foreignKey: "assetId",
    as: "asset"
});

UserTransaction.belongsTo(Asset, {
    foreignKey: "assetId",
    as: "asset"
});

AssetNetwork.hasMany(UserTransaction, {
    foreignKey: "assetNetworkId",
    as: "transaction"
});

UserTransaction.belongsTo(AssetNetwork, {
    foreignKey: "assetNetworkId",
    as: "assetNetworks"
});

// Category Translation
Category.hasMany(CategoryTranslation, {
    foreignKey: "categoryId",
    as: "categoryTranslation"
});

CategoryTranslation.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category"
});

Language.hasMany(CategoryTranslation, {
    foreignKey: "languageId",
    as: "categoryTranslation"
});

CategoryTranslation.belongsTo(Language, {
    foreignKey: "languageId",
    as: "language"
});

Category.hasMany(Category, {
    onDelete: "CASCADE",
    foreignKey: "parent",
    as: "children"
});

Category.hasMany(Blog, {foreignKey: "categoryId", as: "blog"});
Blog.belongsTo(Category, {foreignKey: "categoryId", as: "category"});

// Blog Translation
Blog.hasMany(BlogTranslation, {
    foreignKey: "blogId",
    as: "blogTranslation"
});

BlogTranslation.belongsTo(Blog, {
    foreignKey: "blogId",
    as: "blog"
});

Language.hasMany(BlogTranslation, {
    foreignKey: "languageId",
    as: "blogTranslation"
});

BlogTranslation.belongsTo(Language, {
    foreignKey: "languageId",
    as: "language"
});

User.hasMany(ManagerNotification, {
    foreignKey: "userId",
    as: "pushNotification"
});

ManagerNotification.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

User.hasMany(SwapTransaction, {foreignKey: "userId", as: "swap"});
SwapTransaction.belongsTo(User, {foreignKey: "userId", as: "user"});

SwapTransaction.belongsTo(Asset, {
    foreignKey: "assetInId",
    as: "assetIn"
});

SwapTransaction.belongsTo(Asset, {
    foreignKey: "assetOutId",
    as: "assetOut"
});


User.hasMany(MatchParticipantTeam, {foreignKey: "userId"});
MatchParticipantTeam.belongsTo(User, {foreignKey: "userId"});

Card.hasMany(MatchParticipantTeam, {foreignKey: "cardId"});
MatchParticipantTeam.belongsTo(Card, {foreignKey: "cardId"});

CompetitionLeague.hasMany(MatchParticipantTeam, {foreignKey: "competitionLeagueId"});
MatchParticipantTeam.belongsTo(CompetitionLeague, {foreignKey: "competitionLeagueId"});

Competition.hasMany(MatchParticipantTeam, {foreignKey: "competitionId"});
MatchParticipantTeam.belongsTo(Competition, {foreignKey: "competitionId"});

Card.hasMany(MatchParticipantTeam, {foreignKey: "cardId"});
MatchParticipantTeam.belongsTo(Card, {foreignKey: "cardId"});

Ticket.belongsTo(User, {foreignKey: "userId", as: "user"});
Ticket.belongsTo(Department, {foreignKey: "departmentId", as: "department"});

Ticket.belongsTo(Manager, {foreignKey: "managerId", as: "manager"});
Ticket.hasMany(Reply, {foreignKey: "ticketId", as: "reply"});
Reply.belongsTo(Ticket, {foreignKey: "ticketId", as: "ticket"});
Reply.belongsTo(User, {foreignKey: "userId", as: "user"});
Reply.belongsTo(Manager, {foreignKey: "managerId", as: "manager"});

Department.hasMany(Ticket, {foreignKey: "departmentId", as: "ticket"});
Manager.hasMany(Ticket, {foreignKey: "managerId", as: "manager"});

Manager.hasMany(Department, {foreignKey: "headManagerId", as: "department"});
Department.belongsTo(Manager, {foreignKey: "headManagerId", as: "headManager"});

Manager.belongsToMany(Department, {through: "manager_department"});
Department.belongsToMany(Manager, {through: "manager_department"});

MatchParticipantTeam.hasMany(MatchParticipant, {
    foreignKey: "participantTeamId"
});
MatchParticipant.belongsTo(MatchParticipantTeam, {
    foreignKey: "participantTeamId"
});

Competition.hasMany(MatchParticipant, {foreignKey: "competitionId"});
MatchParticipant.belongsTo(Competition, {foreignKey: "competitionId"});

CompetitionTask.hasMany(MatchParticipant, {
    foreignKey: "competitionTaskId"
});
MatchParticipant.belongsTo(CompetitionTask, {
    foreignKey: "competitionTaskId"
});

Asset.hasMany(ReferralReward, {foreignKey: "assetId"});
ReferralReward.belongsTo(Asset, {foreignKey: "assetId"});

Country.hasMany(User, {foreignKey: "countryId"});
User.belongsTo(Country, {foreignKey: "countryId"});

User.hasMany(UserPayment, {foreignKey: "userId", as: "payments"});
UserPayment.belongsTo(User, {foreignKey: "userId", as: "user"});

Asset.hasMany(UserPayment, {foreignKey: "assetId", as: "payments"});
UserPayment.belongsTo(Asset, {foreignKey: "assetId", as: "asset"});

User.hasMany(ReferralStatistic, {foreignKey: "userId"});
ReferralStatistic.belongsTo(User, {foreignKey: "userId"});

User.hasMany(ReferralStatistic, {foreignKey: "userId"});
ReferralStatistic.belongsTo(User, {foreignKey: "userId"});

Asset.hasMany(Fee, {foreignKey: "assetId"});
Fee.belongsTo(Asset, {foreignKey: "assetId"});

Auction.hasMany(ReferralReward, {foreignKey: "auctionId"});
ReferralReward.belongsTo(Auction, {foreignKey: "auctionId"});

Auction.hasMany(AuctionLog, {foreignKey: "auctionId"});
AuctionLog.belongsTo(Auction, {foreignKey: "auctionId"});

User.hasMany(AuctionLog, {foreignKey: "userId"});
AuctionLog.belongsTo(User, {foreignKey: "userId"});

Card.hasMany(AuctionLog, {foreignKey: "cardId"});
AuctionLog.belongsTo(Card, {foreignKey: "cardId"});

AssignedCard.hasMany(AuctionLog, {foreignKey: "assignedCardId"});
AuctionLog.belongsTo(AssignedCard, {foreignKey: "assignedCardId"});

// Permission Role M-M
Manager.belongsToMany(Permission, {through: "Permission_Manager"});
Permission.belongsToMany(Manager, {through: "Permission_Manager"});

Role.belongsToMany(Permission, {through: "Permission_Role"});
Permission.belongsToMany(Role, {through: "Permission_Role"});

Role.belongsToMany(Manager, {through: "Role_Manager"});
Manager.belongsToMany(Role, {through: "Role_Manager"});

User.hasMany(AgentSession, {foreignKey: "userId", as: "session"});
AgentSession.belongsTo(User, {foreignKey: "userId", as: "agent"});

User.hasMany(AgentStatistic, {foreignKey: "userId", as: "userAgentStatistic"});
AgentStatistic.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(AgentStatistic, {foreignKey: "agentId", as: "agentStatistic"});
AgentStatistic.belongsTo(User, {foreignKey: "agentId", as: "agent"});

User.hasMany(AgentReward, {foreignKey: "userId", as: "userAgentReward"});
AgentReward.belongsTo(User, {foreignKey: "userId", as: "user"});

User.hasMany(AgentReward, {foreignKey: "agentId", as: "agentReward"});
AgentReward.belongsTo(User, {foreignKey: "agentId", as: "agent"});

Auction.hasMany(AgentReward, {foreignKey: "auctionId"});
AgentReward.belongsTo(Auction, {foreignKey: "auctionId"});

User.hasMany(AgentLink, {foreignKey: "agentId", as: "agent"});
AgentLink.belongsTo(User, {foreignKey: "agentId", as: "agent"});

User.hasMany(AgentLinkStatistic, {foreignKey: "userId"});
AgentLinkStatistic.belongsTo(User, {foreignKey: "userId"});

AgentLink.hasMany(AgentLinkStatistic, {foreignKey: "agentLinkId"});
AgentLinkStatistic.belongsTo(AgentLink, {foreignKey: "agentLinkId"});

AgentLink.hasMany(AgentReward, {foreignKey: "agentLinkId"});
AgentReward.belongsTo(AgentLink, {foreignKey: "agentLinkId"});

User.hasMany(AgentReport, {foreignKey: "agentId"});
AgentReport.belongsTo(User, {foreignKey: "agentId"});

User.hasMany(UserCollection, {foreignKey: "userId"});
UserCollection.belongsTo(User, {foreignKey: "userId", as: "user"});

UserToken.belongsTo(UserCollection, {foreignKey: "collectionId"});
UserCollection.hasMany(UserToken, {foreignKey: "collectionId"});

UserCollection.hasMany(UserAssignedToken, {foreignKey: "collectionId"});
UserAssignedToken.belongsTo(UserCollection, {foreignKey: "collectionId"});

UserToken.hasMany(UserAssignedToken, {foreignKey: "tokenId"});
UserAssignedToken.belongsTo(UserToken, {foreignKey: "tokenId"});

User.hasMany(UserAssignedToken, {foreignKey: "userId"});
UserAssignedToken.belongsTo(User, {foreignKey: "userId"});

User.hasMany(UserActivity, {foreignKey: "from"});
UserActivity.belongsTo(User, {foreignKey: "from"});

User.hasMany(UserActivity, {foreignKey: "to"});
UserActivity.belongsTo(User, {foreignKey: "to"});


const models = {
    Asset,
    GiveAway,
    User,
    UserSession,
    UserWallet,
    UserNotification,
    Settings,
    ReferralReward,
    UserTransaction,
    UserErrorTransaction,
    Network,
    AssetNetwork,
    SystemWallet,
    Manager,
    ManagerSession,
    Auction,
    AuctionOffer,
    UserAuctionTrade,
    Blog,
    BlogTranslation,
    Category,
    CategoryTranslation,
    Language,
    CardType,
    Card,
    AssignedCard,
    Bonus,
    UserBonus,
    ManagerNotification,
    SwapTransaction,
    Competition,
    CompetitionLeague,
    // CompetitionTask,
    // PrizePool,
    Prize,
    MatchParticipantTeam,
    Fee,
    Ticket,
    Reply,
    Department,
    UserPrize,
    MatchParticipant,
    Statistic,
    Country,
    UserPayment,
    ContactUs,
    EmailSubscribe,
    ReferralStatistic,
    AuctionLog,
    TokenPrize,
    Role,
    Permission,
    AgentSession,
    AgentReward,
    AgentLinkStatistic,
    AgentStatistic,
    AgentLink,
    AgentReport,
    UserTokenPrize,
    CompetitionTask,
    Attribute,
    UserAttribute,
    Box,
    UserBox,
    BoxAuction,
    BoxSetting,
    BoxTrade,
    Lens,
    LensSetting,
    LensAuction,
    LensTrade,
    UserLens,
    Currency,
    UserPost,
    Owner,
    TelegramChat,
    UserCollection,
    UserToken,
    UserAssignedToken,
    UserActivity,
    UserAuctions,
    UserExplore,
    EventBlockNumber,
    UserCollectionStats
};


module.exports = {sequelize, Op, Sequelize, literal, ...models};
