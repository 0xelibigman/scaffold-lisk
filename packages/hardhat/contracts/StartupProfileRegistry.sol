// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title StartupProfileRegistry
 * @dev Stores startup profile information on-chain
 */
contract StartupProfileRegistry {
    struct StartupProfile {
        string name;
        string description;
        string website;
        string industry;
        string stage;
        string complianceRegion;
        uint256 lastUpdated;
    }

    // Mapping from address to startup profile
    mapping(address => StartupProfile) private profiles;
    
    // Array to track all registered addresses
    address[] private registeredAddresses;

    // Events
    event ProfileUpdated(address indexed owner, string name, uint256 timestamp);
    event ProfileDeleted(address indexed owner, uint256 timestamp);

    /**
     * @dev Updates the startup profile for the sender
     */
    function updateProfile(
        string memory name,
        string memory description,
        string memory website,
        string memory industry,
        string memory stage,
        string memory complianceRegion
    ) external {
        bool isNewProfile = bytes(profiles[msg.sender].name).length == 0;
        
        profiles[msg.sender] = StartupProfile({
            name: name,
            description: description,
            website: website,
            industry: industry,
            stage: stage,
            complianceRegion: complianceRegion,
            lastUpdated: block.timestamp
        });

        if (isNewProfile) {
            registeredAddresses.push(msg.sender);
        }

        emit ProfileUpdated(msg.sender, name, block.timestamp);
    }

    /**
     * @dev Retrieves the startup profile for a given address
     */
    function getProfile(address owner) external view returns (
        string memory name,
        string memory description,
        string memory website,
        string memory industry,
        string memory stage,
        string memory complianceRegion,
        uint256 lastUpdated
    ) {
        StartupProfile storage profile = profiles[owner];
        return (
            profile.name,
            profile.description,
            profile.website,
            profile.industry,
            profile.stage,
            profile.complianceRegion,
            profile.lastUpdated
        );
    }

    /**
     * @dev Deletes the startup profile for the sender
     */
    function deleteProfile() external {
        require(bytes(profiles[msg.sender].name).length > 0, "Profile doesn't exist");
        
        delete profiles[msg.sender];
        
        // Remove from the registered addresses array
        for (uint i = 0; i < registeredAddresses.length; i++) {
            if (registeredAddresses[i] == msg.sender) {
                registeredAddresses[i] = registeredAddresses[registeredAddresses.length - 1];
                registeredAddresses.pop();
                break;
            }
        }

        emit ProfileDeleted(msg.sender, block.timestamp);
    }

    /**
     * @dev Returns all registered addresses
     */
    function getAllRegisteredAddresses() external view returns (address[] memory) {
        return registeredAddresses;
    }

    /**
     * @dev Returns the number of registered profiles
     */
    function getProfileCount() external view returns (uint256) {
        return registeredAddresses.length;
    }
}